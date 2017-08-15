import { StageName } from '../model/Stages';
export function getFormattedDate() {
    const date = new Date()
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

export const DATE_REGEX = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/

export function getMovedToColumnNameFromStageName(stageName: StageName) {
    switch(stageName) {
        case 'Assign Processor':
            return 'Moved_x0020_to_x0020_Assign_x002'

        case 'Authority Work Review':
            return 'Moved_x0020_to_x0020_Authority_x'
            
        case 'Catalog Collection':
            return 'Moved_x0020_to_x0020_Catalog_x00'

        case 'Collections Management Collections Review':
            return 'Moved_x0020_to_x0020_Collections'

        case 'Complete':
            return 'Moved_x0020_to_x0020_Complete'

        case 'Content Review':
            return 'Moved_x0020_to_x0020_Content_x00'

        case 'Deliver Collection':
            return 'Moved_x0020_to_x0020_Deliver_x00'

        case 'Description Specialist Collection Review':
            return 'Moved_x0020_to_x0020_Description'

        case 'Enter Aquisition Information':
            return 'Moved_x0020_to_x0020_Enter_x0020'

        case 'Enter Description':
            return 'Moved_x0020_to_x0020_Enter_x0020'

        case 'Final Curator Review':
            return 'Moved_x0020_to_x0020_Final_x0020'

        case 'Labeling Barcode And Locations Assigned':
            return 'Moved_x0020_to_x0020_Labeling_x0'

        case 'Pickup from Processor':
            return 'Moved_x0020_to_x0020_Pickup_x002'

        case 'Processing Plan':
            return 'Moved_x0020_to_x0020_Processing_'

        case 'Retrieve Collection From Curator':
            return 'Moved_x0020_to_x0020_Retrieve_x0'

        case 'Review Processing Plan':
            return 'Moved_x0020_to_x0020_Review_x002'

        case 'Suspended':
            return 'Moved_x0020_to_x0020_Suspended'

        case 'Uploading Finding Aid':
            return 'Moved_x0020_to_x0020_Uploading_x'

    }
}
