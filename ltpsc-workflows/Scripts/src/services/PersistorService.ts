import { IUser } from '../model/Users';
import { TestListItems, TestUser } from '../model/MockObjects';
import { ListItem } from '../model/ListItem';


export async function fetchCurrentUser(): Promise<IUser> {
    return Promise.resolve(TestUser)
}

export async function fetchListItems(): Promise<ListItem[]> {
    return Promise.resolve(TestListItems)
}
