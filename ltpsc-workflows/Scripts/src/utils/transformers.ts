import { ListItem } from '../model/ListItem';
import { runInAction, action } from 'mobx';

export function listItemDTOsToListItems(listItemDTOs): Array<ListItem> {
    return listItemDTOs.map((dto) => listItemDTOToListItem(dto))
}

function listItemDTOToListItem(dto): ListItem {
    const listItem = new ListItem()
    for(let field in listItem) {
        runInAction(() => listItem[field] = dto[field])
    }

    return listItem
}