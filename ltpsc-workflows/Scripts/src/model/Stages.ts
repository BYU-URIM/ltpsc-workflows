export type StageName = 'Enter Aquisition Information' | 'Processing Plan' | 'Review Processing Plan' | 'Retrieve Collection From Curator' | 'Request Materials' |
                        'Assign Processor' | 'Deliver Collection' | 'Enter Description' | 'Content Review' | 'Collections Management Collection Review' |
                        'Pickup from Processor' | 'Description Specialist Collection Review' | 'Authority Work Review' | 'Catalog Collection' | 'Review of Accession Record' |
                        'Uploading Finding Aid' | 'Final Curator Review' | 'Labeling Barcode And Locations Assigned' | 'Default' | 'Complete' | 'Suspended'


// NOTE - stage order ends with 'complete' but does not include 'suspended'
export const StageOrder: Array<StageName> = [
    'Enter Aquisition Information',
    'Processing Plan',
    'Review Processing Plan',
    'Review of Accession Record',
    'Retrieve Collection From Curator',
    'Assign Processor',
    'Request Materials',
    'Deliver Collection',
    'Enter Description',
    'Content Review',
    'Collections Management Collection Review',
    'Pickup from Processor',
    'Description Specialist Collection Review',
    'Authority Work Review',
    'Final Curator Review',
    'Catalog Collection',
    'Uploading Finding Aid',
    'Labeling Barcode And Locations Assigned',
    'Complete'
]

// represents bundle of data to pass to the server during a pending save
// separate from the rest of the listItemData for easy roll back if save fails
export interface IPendingStageData {
    Stage: StageName,
    [movedToOrSubmitterColumnName: string]: string,
    Previous_x0020_Stage?: StageName
}