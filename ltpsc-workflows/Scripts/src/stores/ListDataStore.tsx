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

    @observable private editFormDisplayStatus: EditFormStatusEnum = EditFormStatusEnum.CLOSED
    
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
        this.currentEditItem = Object.assign({}, this.currentViewListItems[this.selectedItemIndex])
        this.editFormDisplayStatus = EditFormStatusEnum.DISPLAYING_EXISTING
    }

    @action closeEditItemForm() {
        this.currentEditItem = DEFAULT_LIST_ITEM
        this.editFormDisplayStatus = EditFormStatusEnum.CLOSED
    }

    @action submitEditItemForm() {
        if(this.canSubmitCurrentItem) {
            this.saveEditItemForm()
        } else {
            this.raiseError(`${this.formErrorCount || 1} form error${this.formErrorCount > 1 ? 's' : ''} - please fill out all required fields.`)
        }
    }

    @action submitEditItemToNextStage() {
        if(this.canSubmitCurrentItem) {
            this.currentEditItem.Stage = this.currentEditItemNextStage
            this.saveEditItemForm()
        } else {
            this.raiseError(`${this.formErrorCount || 1} form error${this.formErrorCount > 1 ? 's' : ''} - please fill out all required fields.`)
        }
    }

    @action updateCurrentEditItem(key: string, value: any) {
        this.currentEditItem[key] = value
    }

    // for keeping track of which list item is selcted in the table
    @action updateSelectedItemIndex(indexSingletonArray: Array<number>) {
        this.selectedItemIndex = indexSingletonArray.length > 0 ? indexSingletonArray[0] : null
    }

    @action returnEditItemToPreviousStage() {
        this.currentEditItem.Stage = this.currentEditItemPreviousstage
        this.submitEditItemForm()
    }

    @action raiseError(message: string, errorMetadata?: any) {
        if(errorMetadata) console.log(errorMetadata)
        this.errorMessage = message
        setTimeout(action(() => {
            this.errorMessage = null
        }), 5000)
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

    @computed get canSubmitCurrentItem(): boolean {
        if(Object.keys(this.currentEditItemValidationState).length > 0) {
            return false
        } else if(this.requiredColumnsFromCurrentView.filter((column) => !this.currentEditItem[column.spName]).length > 0) {
            return false
        } else {
            return true
        }
    }

    @computed get currentEditItemNextStage(): string {
        const stageIndex = StageOrder.indexOf(this.currentEditItem.Stage)
        return stageIndex !== StageOrder.length - 1 ? StageOrder[stageIndex + 1] : null
    }

    @computed get currentEditItemPreviousstage(): string {
        const stageIndex = StageOrder.indexOf(this.currentEditItem.Stage)
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


    private saveEditItemForm() {
        if(this.editFormDisplayStatus === EditFormStatusEnum.DISPLAYING_NEW) {
            PersistorService.createListItem(this.currentEditItem).then(action(() => {
                this.listitems.push(this.currentEditItem)
                this.currentEditItem = DEFAULT_LIST_ITEM
                this.editFormDisplayStatus = EditFormStatusEnum.CLOSED
            })).catch(action((error) => this.raiseError('There was an error talking to the SharePoint Server.  Please try again.', error)))
        } else if(this.editFormDisplayStatus === EditFormStatusEnum.DISPLAYING_EXISTING) {
            PersistorService.updateListItem(this.currentEditItem).then(action(() => {
                let staleItemIndex: number = this.listitems.findIndex((listItem) => this.selectedItemID === listItem.Id)
                this.listitems[staleItemIndex] = this.currentEditItem
                this.currentEditItem = DEFAULT_LIST_ITEM
                this.editFormDisplayStatus = EditFormStatusEnum.CLOSED
            })).catch(action((error) => this.raiseError('There was an error talking to the SharePoint Server.  Please try again.', error)))
        }
    }
}