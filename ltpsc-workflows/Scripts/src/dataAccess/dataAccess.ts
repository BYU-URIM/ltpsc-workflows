import { ajax } from 'jquery'
import * as $ from 'jquery'
import { ListItem } from '../model/ListItem';

const hostWebUrl = 'https://ltpsc-workflows.byu.edu'

export function fetchCurrentUserFromServer(): JQueryXHR {
    return ajax({
        url: '../_api/web/currentuser',
        method: 'GET',
        headers: { 'Accept': 'application/json; odata=verbose' },
    })
}


// generic GET call to the supplied endpoint
export function genericGetByEndpoint(endpoint: string): JQueryXHR {
    return ajax({
        url: endpoint,
        method: 'GET',
        headers: { 'Accept': 'application/json; odata=verbose' },
    })
}

export function fetchListItemsFromServer(): JQueryXHR {
    return ajax({
        url: `../_api/SP.AppContextSite(@target)/web/lists/getbytitle('LTPSC')/items?@target='${hostWebUrl}'`,
        method: 'GET',
        headers: { 'Accept': 'application/json; odata=verbose' },
    })
}

export function fetchLookupValuesFromServer(listName: string): JQueryXHR {
    return ajax({
        url: `../_api/SP.AppContextSite(@target)/web/lists/getbytitle('${listName}')/items?@target='${hostWebUrl}'`,
        method: 'GET',
        headers: { 'Accept': 'application/json; odata=verbose' },
    })
}

export function createListItemOnServer(listItem: ListItem, requestDigest: string): JQueryXHR {
    const spListItem = Object.assign(listItem, { __metadata: {'type': 'SP.Data.LTPSC_x0020_AllListItem'}})
    return ajax({
        url: `../_api/SP.AppContextSite(@target)/web/lists/getbytitle('LTPSC')/items?@target='${hostWebUrl}'`,
        method: 'POST',
        contentType: 'application/json; odata=verbose',
        headers: {
            'Accept': 'application/json; odata=verbose',
            'X-RequestDigest': requestDigest,
            'contentType': 'application/json; odata=verbose'
        },
        data : JSON.stringify(spListItem)
    })
}

export function updateListItemOnServer(listItem: ListItem, requestDigest: string): JQueryXHR {
    const spListItem = Object.assign(listItem, { __metadata: {'type': 'SP.Data.LTPSC_x0020_AllListItem'}})
    return ajax({
        url: `../_api/SP.AppContextSite(@target)/web/lists/getbytitle('LTPSC')/items(${listItem.Id})?@target='${hostWebUrl}'`,
        method: 'POST',
        contentType: 'application/json; odata=verbose',
        headers: {
            'Accept': 'application/json; odata=verbose',
            'X-RequestDigest': requestDigest,
            'contentType': 'application/json; odata=verbose',
            'X-HTTP-Method': 'MERGE',
            'IF-MATCH': '*'
        },
        data : JSON.stringify(listItem)
    })
}

export function fetchSecurityValidation(): JQueryXHR {
    return ajax({
        url: `../_api/contextinfo`,
        method: "POST",
        contentType: "application/json; odata=verbose",
        headers: { "Accept": "application/json; odata=verbose" }
    });
}