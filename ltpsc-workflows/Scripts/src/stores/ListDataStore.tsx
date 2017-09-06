import 'reflect-metadata'
import { observable, computed, action, runInAction, extendObservable } from 'mobx'
import { injectable } from 'inversify'
import { autobind } from 'core-decorators'
import { IView } from '../model/Views';
import { IUser } from '../model/Users'
import * as PersistorService from '../services/PersistorService'
import { DEFAULT_USER } from '../model/Users'
import { DEAFULT_VIEW } from '../model/Views'
import { DATE_REGEX, getMovedToColumnNameFromStageName, getFormattedDate } from '../utils/general';
import { ListItem, DEFAULT_LIST_ITEM } from '../model/ListItem';
import { StageName, StageOrder, IPendingStageData } from '../model/Stages';
import { EditFormStatusEnum } from '../model/EditFormStatusEnum';
import { ILookupOptionDictionary } from '../model/Columns';
import * as PdfService from '../services/PdfService'


@autobind
@injectable()
export default class ListDataStore {
    @observable currentView: IView = DEAFULT_VIEW
    @observable currentUser: IUser = DEFAULT_USER
    @observable currentEditItem: ListItem = DEFAULT_LIST_ITEM
    @observable listitems: Array<ListItem> = []
    @observable selectedItemIndex: number = null
    @observable lookupValues: Map<string, ILookupOptionDictionary> = new Map()
    @observable errorMessage: string = null
    @observable asyncPendingLockout: boolean = false
    @observable isDisplaySuspensionDialogue: boolean = false
    @observable editFormDisplayStatus: EditFormStatusEnum = EditFormStatusEnum.CLOSED
    
    @computed get currentViewSPNames() {
        return this.currentView.columns.map((column) => column.spName)
    }

    @computed get currentUserAllPermittedViews(): Array<IView> {
        if(this.currentUser) {
            return this.currentUser.groups.reduce((accumulator, group) => {
                accumulator.push(...group.permittedViews)
                return accumulator
            }, [])
        } else {
            return []
        }
    }

    @action
    async fetchData() {        
        // user and group data
        const currentUser = await PersistorService.fetchCurrentUser()
        runInAction(() => this.currentUser = currentUser)
        runInAction(() => this.currentView = this.currentUser.groups[0].permittedViews[0] || DEAFULT_VIEW)

        // lookup column metadata
        const lookupValuesMap = await PersistorService.fetchLookupValues()
        runInAction(() => this.lookupValues = lookupValuesMap)

        // list items
        const listItems = await PersistorService.fetchListItems()
        runInAction(() => this.listitems = listItems)
    }

    @action setCurrentView(viewName: string) {
        this.currentView = this.currentUserAllPermittedViews.find((view) => {
            return view.stageName === viewName
        })
    }

    @action displayNewItemForm() {
        this.currentEditItem = new ListItem()
        this.currentEditItem.Stage = this.currentView.stageName
        this.editFormDisplayStatus = EditFormStatusEnum.DISPLAYING_NEW
        this.currentView.columns.forEach((column) => {
            if(column.defaultValue) this.currentEditItem[column.spName] = column.defaultValue
        })
    }

    @action displayExisitingItemForm() {
        // copy the list item so that all changes are made to a temporary item
        this.currentEditItem = Object.assign(new ListItem(), this.currentViewListItems[this.selectedItemIndex])
        this.editFormDisplayStatus = EditFormStatusEnum.DISPLAYING_EXISTING
    }

    @action closeEditItemForm() {
        this.currentEditItem = DEFAULT_LIST_ITEM
        this.editFormDisplayStatus = EditFormStatusEnum.CLOSED
    }

    @action async submitEditItemForm() {
        if(!this.canSubmitCurrentItemToSameOrLowerStage) {
            this.raiseFormError()
            return
        }

        const saveInfo = await this.saveEditItemForm() // saveInfo will be null if there was an error saving
        if(saveInfo) {
            this.onSuccessfullSave(saveInfo)
        }
    }

    @action async submitEditItemToNextStage() {
        if(!this.canSubmitCurrentItemToHigherStage) {
            this.raiseFormError()
            return
        }

        // list item save process
        const pendingStageData: IPendingStageData = {
            Stage: this.currentEditItemNextStage, 
            [getMovedToColumnNameFromStageName(this.currentEditItemNextStage)]: getFormattedDate()
        }
        // await the list item save and store the JSON returned from the server if successfull or null if there was an error
        const listItemSaveInfo = await this.saveEditItemForm(pendingStageData)


        // pdf save process
        let pdfSaveError = false
        // if the save was successfull and the next stage is complete, attempt to archive the PDF of the item
        if(listItemSaveInfo && pendingStageData.Stage === StageOrder[StageOrder.length - 1]) {
            runInAction(() => this.asyncPendingLockout = false) // relock the UI since another asnyc operation is required
            try {
                await PersistorService.createListItemPdf(this.currentEditItem)
            } catch(error) {
                pdfSaveError = true
                this.onAsyncError(error)
                // if the PDF save fails, roll back the listItem save by saving the current edit item form WITHOUT a new pending stage
                // this undoes the prevous save with a new stage, since the item will need to stay in its current stage after a failed pdf save
                await this.saveEditItemForm()
            } finally {
                runInAction(() => this.asyncPendingLockout = false)
            }
        }

        if(listItemSaveInfo && !pdfSaveError) {
            this.onSuccessfullSave(listItemSaveInfo, pendingStageData)
        }
    }

    @action async returnEditItemToPreviousStage() {
        if(!this.canSubmitCurrentItemToSameOrLowerStage) {
            this.raiseFormError()
            return
        }

        const pendingStageData: IPendingStageData = {
            Stage: this.currentEditItemPreviousstage, 
            [getMovedToColumnNameFromStageName(this.currentEditItemPreviousstage)]: getFormattedDate()
        }
        const saveInfo = await this.saveEditItemForm(pendingStageData)
        if(saveInfo) {
            this.onSuccessfullSave(saveInfo, pendingStageData)
        }
    }

    @action async suspendEditItem() {
        if(!this.canSubmitCurrentItemToSameOrLowerStage) {
            this.raiseFormError()
            return
        }

        this.closeSuspensionDialogue()

        const pendingStageData: IPendingStageData = { 
            Stage: 'Suspended', 
            [getMovedToColumnNameFromStageName('Suspended')]: getFormattedDate(),
            LastStageBeforeSuspension: this.currentEditItem.Stage
        }
        const saveInfo = await this.saveEditItemForm(pendingStageData)
        if(saveInfo) {
            this.onSuccessfullSave(saveInfo, pendingStageData)
        }
    }

    @action updateCurrentEditItem(key: string, value: any) {
        this.currentEditItem[key] = value
    }

    // for keeping track of which list item is selcted in the table
    @action updateSelectedItemIndex(indexSingletonArray: Array<number>) {
        this.selectedItemIndex = indexSingletonArray.length > 0 ? indexSingletonArray[0] : null
    }

    @action raiseError(message: string, errorMetadata?: any) {
        if(errorMetadata) console.log(errorMetadata)
        this.errorMessage = message
        setTimeout(action(() => {
            this.errorMessage = null
        }), 5000)
    }

    // specifically raises form error including error count and proper formatting
    @action private raiseFormError() {
        this.raiseError(`${this.formErrorCount || 1} form error${this.formErrorCount > 1 ? 's' : ''} - please fill out all required fields.`)
    }

    @action private onAsyncError(error: any): void {
        this.raiseError('There was an error talking to the SharePoint Server.  Please try again.', error)
        this.asyncPendingLockout = false
    }

    @action openSuspensionDialogue(): void {
        this.isDisplaySuspensionDialogue = true
    }

    @action closeSuspensionDialogue(): void {
        this.isDisplaySuspensionDialogue = false
    }

    @action createPickupTicket() {
        this.asyncPendingLockout = true
        PdfService.generatePickupTicketPdf(this.currentEditItem)
        this.asyncPendingLockout = false
    }

    @computed get currentEditItemValidationState() {
        return this.currentView.columns.reduce((accumulator, column) => {
            const inputVal = this.currentEditItem[column.spName]

            // check to make sure all untouched, required items are present
            if(column.required && inputVal === '') accumulator[column.spName] = 'This field is required'

            // check to make sure date items conform
            if(column.type === 'datetime' && inputVal && !DATE_REGEX.test(inputVal)) accumulator[column.spName] = 'Date should be mm/dd/yyyy format'

            // check to make sure numbers conform
            if(column.type === 'number' && inputVal && isNaN(inputVal)) accumulator[column.spName] = 'Input should be a number'

            return accumulator
        }, {})
    }

    @computed get formErrorCount(): number {
        return Object.keys(this.currentEditItemValidationState).length
    }

    // strictist validation rules - must not be any form errors AND all required fields must be filled in
    @computed get canSubmitCurrentItemToHigherStage(): boolean {
        if(Object.keys(this.currentEditItemValidationState).length > 0) {
            return false
        } else if(this.requiredColumnsFromCurrentView.filter((column) => !this.currentEditItem[column.spName]).length > 0) {
            return false
        } else {
            return true
        }
    }

    // less strict validation rules - must not be any form errors
    @computed get canSubmitCurrentItemToSameOrLowerStage(): boolean {
        if(Object.keys(this.currentEditItemValidationState).length > 0) {
            return false
        } else {
            return true
        }
    }

    @computed get currentEditItemNextStage(): StageName {
        if(this.currentView.stageName !== 'Suspended') {
            const stageIndex = StageOrder.indexOf(this.currentEditItem.Stage as StageName)
            return stageIndex !== StageOrder.length - 1 ? StageOrder[stageIndex + 1] : null
        } else {
            return null
        }
    }

    @computed get currentEditItemPreviousstage(): StageName {
        if(this.currentView.stageName !== 'Suspended') {
            const stageIndex = StageOrder.indexOf(this.currentEditItem.Stage as StageName)
            return stageIndex !== 0 ? StageOrder[stageIndex - 1] : null
        } else {
            return this.currentEditItem.LastStageBeforeSuspension as StageName || StageOrder[0]
        }
    }

    @computed get currentViewListItems() {
        return this.listitems.filter((listItem) => {
            return listItem.Stage === this.currentView.stageName
        })
    }

    @computed get isDisplayEditItemForm() {
        return this.editFormDisplayStatus !== EditFormStatusEnum.CLOSED
    }

    @computed get requiredColumnsFromCurrentView() {
        return this.currentView.columns.filter((column) => column.required)
    }

    getPendingItemCountForView(stageName: string) {
        return this.listitems.filter((listItem) => listItem.Stage === stageName).length
    }

    @computed get canSuspendCurrentEditItem() {
        return this.isCurrentUserAdmin && this.editFormDisplayStatus === EditFormStatusEnum.DISPLAYING_EXISTING && this.currentView.stageName !== 'Suspended'
    }

    @computed get canCreateShippingLabel() {
        return this.currentEditItem.Stage === 'Pickup from Processor'
    }

    // private helpers
    @computed private get selectedItemID() {
        return this.currentViewListItems[this.selectedItemIndex].Id
    }

    @computed private get isCurrentUserAdmin(): boolean {
        return !!this.currentUser.groups.find(group => group.name === 'Admin Only')
    }


    // this function is in charge of attempting to save a form to the server and handling async errors
    // @PARAM optional pendingStage, meaning if there is a pending stage change, it can be attempted to save on the server without the caller having
    // to update the cached listItem in memory prematurely - the caller can wait untill a successfull save has been detected
    @action private async saveEditItemForm(pendingStageData?: IPendingStageData): Promise<any> {
        // await calls to server
        try {
            this.asyncPendingLockout = true
            const saveItem: ListItem = pendingStageData // if there is a pending stage, create a new object with the pending data (stage and MovedTo date) before the attempted save
                ? Object.assign({}, this.currentEditItem, pendingStageData) 
                : Object.assign({}, this.currentEditItem) // otherwise, save a clone of the current item

            const persistorFunction = this.editFormDisplayStatus === EditFormStatusEnum.DISPLAYING_NEW ? PersistorService.createListItem : PersistorService.updateListItem
            const saveInfo = await persistorFunction(saveItem)

            return saveInfo

        } catch(error) {
            this.onAsyncError(error)
            return null
        } finally {
            runInAction(() => this.asyncPendingLockout = false)
        }

    }

    // private helper functions managing clean after successfull save
    @action private onSuccessfullSave(saveInfo: any, newStageData?: IPendingStageData) {
        // update the current edit item with the most recent data successfully saved to the server
        this.currentEditItem.Id = saveInfo.Id
        if(newStageData) 
            for(let key in newStageData) { this.currentEditItem[key] = newStageData[key] }

        // add the current edit item back into its place in the store
        if(this.editFormDisplayStatus === EditFormStatusEnum.DISPLAYING_NEW) {
            this.listitems.push(this.currentEditItem)
        } else if(this.editFormDisplayStatus === EditFormStatusEnum.DISPLAYING_EXISTING) {
            let staleItemIndex: number = this.listitems.findIndex((listItem) => this.selectedItemID === listItem.Id)
            this.listitems[staleItemIndex] = this.currentEditItem
         }

         // close down the modal
        this.currentEditItem = DEFAULT_LIST_ITEM
        this.editFormDisplayStatus = EditFormStatusEnum.CLOSED
    }
}