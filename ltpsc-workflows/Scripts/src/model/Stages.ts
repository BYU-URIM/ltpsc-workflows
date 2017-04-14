export type StageName = 'Enter Aquisition Information' | 'Processing Plan' | 'Review Processing Plan' | 'Retrieve Collection From Curator' |
                        'Assign Processor' | 'Deliver Collection' | 'Enter Description' | 'Content Review' | 'Collections Management Collections Review' |
                        'Pickup from Processor' | 'Description Specialist Collection Review' | 'Authority Work Review' | 'Catalog Collection' |
                        'Uploading Finding Aid' | 'Final Curator Review' | 'Labeling Barcode And Locations Assigned' | 'Default' | 'Complete' | 'Suspended'


// NOTE - stage order ends with 'complete' but does not include 'suspended'
export const StageOrder: Array<StageName> = [
    'Enter Aquisition Information',
    'Processing Plan',
    'Review Processing Plan',
    'Retrieve Collection From Curator',
    'Assign Processor',
    'Deliver Collection',
    'Enter Description',
    'Content Review',
    'Collections Management Collections Review',
    'Pickup from Processor',
    'Description Specialist Collection Review',
    'Authority Work Review',
    'Catalog Collection',
    'Uploading Finding Aid',
    'Final Curator Review',
    'Labeling Barcode And Locations Assigned',
    'Complete'
]