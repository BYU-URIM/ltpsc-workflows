import { IGroup } from './Groups';
import * as Groups from './Groups'

export class IUser {
    name: string
    email: string
    netId: string
    group: IGroup
}

export const DEFAULT_USER: IUser = {
    name: 'User',
    email: 'n/a',
    netId: 'n/a',
    group: {
        name: 'Default Group',
        permittedViews: []
    }
}
