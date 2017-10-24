import { StageName } from '../model/Stages';

export function getFormattedDate() {
    const date = new Date()
    return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

export const DATE_REGEX = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/

// maps a stage name to a SharePoint column corresponding to the date when an item was moved to a certain stage
// 'Moved to ___' cloumns must exist for each stage so that a single items course can be tracked over time
export function getMovedToColumnNameFromStageName(stageName: StageName) {
    switch(stageName) {
        case 'Assign Processor':
            return 'Moved_x0020_to_x0020_Assign_x002'

        case 'Authority Work Review':
            return 'Moved_x0020_to_x0020_Authority_x'
            
        case 'Catalog Collection':
            return 'Moved_x0020_to_x0020_Catalog_x00'

        case 'Collections Management Collection Review':
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
        
        case 'Request Materials':
            return 'Moved_x0020_to_x0020_Request_x00'
        
        case 'Review of Accession Record':
            return 'Moved_x0020_to_x0020_Review_x0020'

        default:
            throw new Error(
                `Stage '${stageName}' is not being mapped to a 'Moved to ___' column. Either the Moved to ${stageName} column does not exist in SharePoint
                or this function is not correctly mapping the stage name to the appropriate SharePoint column name.` 
            )

    }
}
