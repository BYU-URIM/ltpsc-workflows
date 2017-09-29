import { observable } from 'mobx'
import { StageOrder } from './Stages';

export class ListItem {
    @observable Id: number
    @observable Title: string
    @observable Accession_x0020_Number: string
    @observable Appraisal_x0020_Note: string
    @observable Approve_x0020_Processing_x0020_P: boolean
    @observable Approve_x0020_Request: boolean
    @observable Arrangement_x0020_and_x0020_Desc: string
    @observable Arrangement_x0020_and_x0020_Desc0: string
    @observable Assigned_x0020_for_x0020_Process: boolean
    @observable Call_x0020_Number: string
    @observable Catalog_x0020_Review_x0020_Appro: boolean
    @observable Catalog_x0020_Review_x0020_Comme: string
    @observable Catalog_x0020_Review_x0020_Date: string
    @observable Cataloging_x0020_Date: string
    @observable Cataloging_x0020_Done: boolean
    @observable Collecting_x0020_AreaId: number
    @observable Collection_x0020_Location_x0020_: boolean
    @observable Collection_x0020_Management_x002: boolean
    @observable Collection_x0020_Management_x0020: string
    @observable Collection_x0020_Management_x0021: string
    @observable Collection_x0020_Type: string
    @observable Comments_x0020_on_x0020_Processi: string
    @observable Complete: boolean
    @observable Component_x0020_Request: string
    @observable Component_x0020_Request_x0020_ID: string
    @observable Condition_x0020_Recommendations_: string
    @observable Condition_x0020_Report_x0020__x0: string
    @observable Current_x0020_Arrangement: string
    @observable Date_x0020_Delivered: string
    @observable Deaccession_x003F_: boolean
    @observable Delivery_x0020_Location: string
    @observable Delivery_x0020_Status: boolean
    @observable Description_x0020_of_x0020_Deacc: string
    @observable Description_x0020_of_x0020_Propo: string
    @observable Description_x0020_Specialist_x00: string // description specialist review date
    @observable Description_x0020_Specialist_x000: string // description specialist review comments
    @observable Expected_x0020_Delivery_x0020_Da: string
    @observable Extent_x0020__x002d__x0020_in_x0: number
    @observable Finding_x0020_Aid_x0020_Uploaded: boolean
    @observable Labeling_x0020_Barcode_x0020_Loc: boolean
    @observable Labeling_x0020_Barcode_x0020_Loc0: string
    @observable List_x0020_Materials_x0020_to_x0: string
    @observable Location_x0020_of_x0020_Material: string
    @observable Location_x0020_of_x0020_Delivery: string
    @observable Monetary_x0020_Vale_x0020_of_x00: number
    @observable Pickup_x0020_Date: string
    @observable Pickup_x0020_Location: string
    @observable Process_x0020_Plan_x0020_Revisio: string
    @observable Processing_x0020_Complete: boolean
    @observable Processing_x0020_Level: string
    @observable Processing_x0020_Plan_x0020_Date: string
    @observable Proposed_x0020_Series_x0020_Arra: string
    @observable Restrictions: string
    @observable Restrictions_x002d_Comments: string
    @observable Review_x0020_Date: string
    @observable Submitting_x0020_Curator: string
    @observable Supervisor_x0020_Review_x0020_Da: string
    @observable Supervisor_x0020_Approval: boolean
    @observable Upload_x0020_Date: string
    @observable Vault_x0020_Materials_x0020_Incl: boolean
    @observable Description_x0020_of_x0020_Propo0: string
    @observable Assigned_x0020_Processor: string
    @observable Deliver_x0020_Explanation: string
    @observable Pickup_x0020_Shelving_x0020_Loca: string
    @observable Pickup_x0020_Shelving_x0020_Date: string
    @observable Labeling_x0020_Date: string
    @observable Barcode_x0020_Date: string
    @observable Barcoding_x0020_Complete: string
    @observable Labeling_x0020_Done: boolean
    @observable Collection_x0020_Assignment_x002: string
    @observable Stage: string = StageOrder[0]
    @observable Moved_x0020_to_x0020_Assign_x002: string
    @observable Moved_x0020_to_x0020_Authority_x: string
    @observable Moved_x0020_to_x0020_Catalog_x00: string
    @observable Moved_x0020_to_x0020_Collections: string
    @observable Moved_x0020_to_x0020_Complete: string
    @observable Moved_x0020_to_x0020_Content_x00: string
    @observable Moved_x0020_to_x0020_Deliver_x00: string
    @observable Moved_x0020_to_x0020_Description: string
    @observable Moved_x0020_to_x0020_Enter_x0020: string
    @observable Moved_x0020_to_x0020_Enter_x00200: string
    @observable Moved_x0020_to_x0020_Final_x0020: string
    @observable Moved_x0020_to_x0020_Labeling_x0: string
    @observable Moved_x0020_to_x0020_Pickup_x002: string
    @observable Moved_x0020_to_x0020_Processing_: string
    @observable Moved_x0020_to_x0020_Retrieve_x0: string
    @observable Moved_x0020_to_x0020_Review_x002: string
    @observable Moved_x0020_to_x0020_Suspended: string
    @observable Moved_x0020_to_x0020_Uploading_x: string
    @observable Previous_x0020_Stage: string
    @observable Stage_x0020_Comments_x0020__x0023: string // StageComments_AssignProcessor
    @observable Stage_x0020_Comments_x0020__x00211: string // StageComments_AuthorityWorkReview
    @observable Stage_x0020_Comments_x0020__x00212: string // StageComments_CatalogCollection
    @observable Stage_x0020_Comments_x0020__x0028: string // Stage_x0020_Comments_x0020__x0028
    @observable Stage_x0020_Comments_x0020__x0027: string // StageComments_ContentReview
    @observable Stage_x0020_Comments_x0020__x0025: string // StageComments_DeliverCollection
    @observable Stage_x0020_Comments_x0020__x00210: string // StageComments_DescriptionSpecialistCollectionReview
    @observable Stage_x0020_Comments_x0020__x002: string // StageComments_EnterAcquisitionInformation
    @observable Stage_x0020_Comments_x0020__x0026: string // StageComments_EnterDescription
    @observable Stage_x0020_Comments_x0020__x00214: string // StageComments_FinalCuratorReview
    @observable Stage_x0020_Comments_x0020__x00215: string // StageComments_LabelingBarcodeAndLocationsAssigned
    @observable Stage_x0020_Comments_x0020__x0029: string // StageComments_PickupFromProcessor
    @observable Stage_x0020_Comments_x0020__x0020: string // StageComments_ProcessingPlan
    @observable Stage_x0020_Comments_x0020__x0024: string // StageComments_RequestMaterials
    @observable Stage_x0020_Comments_x0020__x0022: string // StageComments_RetrieveCollectionFromCurator
    @observable Stage_x0020_Comments_x0020__x0021: string // StageComments_ReviewProcessingPlan
    @observable Stage_x0020_Comments_x0020__x00213: string // StageComments_UploadingFindingAid
}

export const DEFAULT_LIST_ITEM = new ListItem()