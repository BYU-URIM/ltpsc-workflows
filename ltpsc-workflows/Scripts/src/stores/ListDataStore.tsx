import 'reflect-metadata'
import { observable, computed, action, runInAction, extendObservable } from 'mobx'
import { injectable } from 'inversify'
import { autobind } from 'core-decorators'
import { IView } from '../model/Views';
import { IUser } from '../model/Users'
import * as PersistorService from '../services/PersistorService'
import { DEFAULT_USER } from '../model/Users'
import { DEAFULT_VIEW } from '../model/Views'
import { DATE_REGEX } from '../utils/general';
import { ListItem, DEFAULT_LIST_ITEM } from '../model/ListItem';
import { StageName, StageOrder } from '../model/Stages';
import { EditFormStatusEnum } from '../model/EditFormStatusEnum';
import { ILookupOptionDictionary } from '../model/Columns';


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

    @computed get currentUserPermittedViews(): Array<IView> {
        return this.currentUser ? this.currentUser.group.permittedViews : []
    }

    @action
    async fetchData() {        
        // user and group data
        const currentUser = await PersistorService.fetchCurrentUser()
        runInAction(() => this.currentUser = currentUser)
        runInAction(() => this.currentView = this.currentUser.group.permittedViews[0] || DEAFULT_VIEW)

        // lookup column metadata
        const lookupValuesMap = await PersistorService.fetchLookupValues()
        runInAction(() => this.lookupValues = lookupValuesMap)

        // list items
        const listItems = await PersistorService.fetchListItems()
        runInAction(() => this.listitems = listItems)
    }

    @action setCurrentView(viewName: string) {
        this.currentView = this.currentUser.group.permittedViews.find((view) => {
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

        const saveInfo = await this.saveEditItemForm(this.currentEditItemNextStage)
        if(saveInfo) {
            runInAction(() => this.currentEditItem.Stage = this.currentEditItemNextStage)
            this.onSuccessfullSave(saveInfo)
        }
    }

    @action async returnEditItemToPreviousStage() {
        if(!this.canSubmitCurrentItemToSameOrLowerStage) {
            this.raiseFormError()
            return
        }

        const saveInfo = await this.saveEditItemForm(this.currentEditItemPreviousstage)
        if(saveInfo) {
            runInAction(() => this.currentEditItem.Stage = this.currentEditItemPreviousstage)
            this.onSuccessfullSave(saveInfo)
        }
    }

    @action async suspendEditItem() {
        if(!this.canSubmitCurrentItemToSameOrLowerStage) {
            this.raiseFormError()
            return
        }

        this.closeSuspensionDialogue()
        const saveInfo = await this.saveEditItemForm('Suspended')
        if(saveInfo) {
            runInAction(() => this.currentEditItem.Stage = 'Suspended') // write stage to cached listItem once valid save call occurs
            this.onSuccessfullSave(saveInfo)
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
        const stageIndex = StageOrder.indexOf(this.currentEditItem.Stage as StageName)
        return stageIndex !== StageOrder.length - 1 ? StageOrder[stageIndex + 1] : null
    }

    @computed get currentEditItemPreviousstage(): StageName {
        const stageIndex = StageOrder.indexOf(this.currentEditItem.Stage as StageName)
        return stageIndex !== 0 ? StageOrder[stageIndex - 1] : null
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



    // private helpers
    @computed private get selectedItemID() {
        return this.currentViewListItems[this.selectedItemIndex].Id
    }


    // this function is in charge of attempting to save a form to the server and handling async errors
    // @PARAM optional pendingStage, meaning if there is a pending stage change, it can be attempted to save on the server without the caller having
    // to update the cached listItem in memory prematurely - the caller can wait untill a successfull save has been detected
    @action private async saveEditItemForm(pendingStage?: StageName): Promise<any> {
        // await calls to server
        try {
            this.asyncPendingLockout = true
            const saveItem: ListItem = pendingStage ? Object.assign({}, this.currentEditItem, {Stage: pendingStage}) : Object.assign({}, this.currentEditItem)

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
    @action private onSuccessfullSave(saveInfo: any) {
        this.currentEditItem.Id = saveInfo.Id
        if(this.editFormDisplayStatus === EditFormStatusEnum.DISPLAYING_NEW) {
            this.listitems.push(this.currentEditItem)
        } else if(this.editFormDisplayStatus === EditFormStatusEnum.DISPLAYING_EXISTING) {
            let staleItemIndex: number = this.listitems.findIndex((listItem) => this.selectedItemID === listItem.Id)
            this.listitems[staleItemIndex] = this.currentEditItem
         }

        this.currentEditItem = DEFAULT_LIST_ITEM
        this.editFormDisplayStatus = EditFormStatusEnum.CLOSED
    }

}