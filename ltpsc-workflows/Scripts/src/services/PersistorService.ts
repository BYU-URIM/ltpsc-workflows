import { IUser } from '../model/Users';
import { TestListItems, TestUser } from '../model/MockObjects';
import { ListItem } from '../model/ListItem';
import * as dao from '../dataAccess/dataAccess'
import * as groups from '../model/Groups'
import IGroup from '../model/Groups';
import * as transformers from '../utils/transformers'
import * as Columns from '../model/Columns'
import { ILookupOptionDictionary } from '../model/Columns';


export async function fetchCurrentUser(): Promise<IUser> {
    const rawUserInfo = await dao.fetchCurrentUserFromServer()
    const rawGroupInfo = await dao.genericGetByEndpoint(rawUserInfo.d.Groups.__deferred.uri)

    // resolve the raw group info into a group objects
    let userGroup = getUserGroupFromRawGroupInfo(rawGroupInfo)

    const user: IUser = {
        name: rawUserInfo.d.Title,
        email: rawUserInfo.d.Email,
        netId: rawUserInfo.d.LoginName,
        group: userGroup
    }

    return Promise.resolve(user)
    //return Promise.resolve(TestUser)
}

export async function fetchListItems(): Promise<ListItem[]> {
    const rawListData = await dao.fetchListItemsFromServer()
    const listItems = transformers.listItemDTOsToListItems(rawListData.d.results)

    return Promise.resolve(listItems)
    //return Promise.resolve(TestListItems)
}


export async function fetchLookupValues(): Promise<Map<string, ILookupOptionDictionary>> {
    const storeMap: Map<string, ILookupOptionDictionary> = new Map()
    
    // Collecting Area
    // TODO optimize for arbitrary list as opposed to hardcoding each lookup column?
    const colAreaData = await dao.fetchLookupValuesFromServer('Collecting Areas')
    const colAreaOptionDictionary: ILookupOptionDictionary = {}
    colAreaData.d.results.forEach((rawColAreaObject) => colAreaOptionDictionary[rawColAreaObject.Id] = rawColAreaObject.Title)
    storeMap.set('Collecting_x0020_AreaId', colAreaOptionDictionary)
    debugger

    return Promise.resolve(storeMap)
    //return Promise.resolve(new Map().set('Collecting_x0020_AreaId', {5: 'option1', 6: 'option2'}))
}


export async function createListItem(listItem: ListItem) {
    const rawSecurityInfo = await dao.fetchSecurityValidation()
    const createInfo = await dao.createListItemOnServer(listItem, rawSecurityInfo.d.GetContextWebInformation.FormDigestValue)
    return createInfo.d
}

export async function updateListItem(listItem: ListItem) {
    const rawSecurityInfo = await dao.fetchSecurityValidation()
    await dao.updateListItemOnServer(listItem, rawSecurityInfo.d.GetContextWebInformation.FormDigestValue)
    return listItem
}


// private helper functions
function getUserGroupFromRawGroupInfo(rawGroupInfo): IGroup {
    for(let groupKey in groups) {
        if(rawGroupInfo.d.results.length && (groups[groupKey].name === rawGroupInfo.d.results[0].Title)) 
            return groups[groupKey]
    }
}
