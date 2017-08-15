import IGroup from './Groups';
import * as Groups from './Groups'

export class IUser {
    name: string
    email: string
    netId: string
    groups: IGroup[]
}

export const DEFAULT_USER: IUser = {
    name: 'User',
    email: 'n/a',
    netId: 'n/a',
    groups: [{
        name: 'Default Group',
        permittedViews: []
    }]
}
