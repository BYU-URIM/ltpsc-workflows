export interface SPResponse extends JQueryXHR {
    data: {
        d: any
    }
}

export interface SPListResponse extends JQueryXHR {
    data: {
        d: {
            results: Array<any>
        }
    }
}
