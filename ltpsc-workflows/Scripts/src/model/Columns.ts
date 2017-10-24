import ListDataStore from '../stores/ListDataStore';
export class Column {
    displayName: string
    spName: string
    type: FieldType
    metadata?: any
    defaultValue?: any
    displayOnly?: boolean
    required?: boolean


    // chainable muators
    makeDisplayOnly() {
        this.displayOnly = true
        return this
    }

    makeRequired() {
        this.required = true
        return this
    }

    setDefaultValue(defaultValue: any) {
        this.defaultValue = defaultValue
        return this
    }

}

// NOTE the difference between choice and lookup is that choice has hardcoded options whereas lookup dynamically fetches options from an SP list 
export type FieldType = 'text' | 'choice' | 'checkbox' | 'textarea' | 'datetime' | 'number' | 'lookup'

// dictionary type that maps a lookup column's option SP Id to their respective text titles
// it is important to store this information because an SP list query only returns an ID for the lookup option, wheras the app needs to display
// option text.  User interfacing requires text, SP interfacing requires ID
export interface ILookupOptionDictionary {
    [OptionId: number]: string
}


// column classes used to build views - they are instanced in the Views.ts files for each view in which they are present
// since all of the 'Moved to <StageName>' columns will never be part of a view, there are no column classes representing them
export class AccessionNumber extends Column {
    displayName = 'Accession Number'
    spName = 'Accession_x0020_Number'
    type = 'text' as FieldType
}

export class AppraisalNote extends Column {
    displayName = 'Appraisal Note'
    spName = 'Appraisal_x0020_Note'
    type = 'textarea' as FieldType
}

export class ApproveAccessionRecord extends Column {
    displayName = 'Approve Accession Record'
    spName = 'Approve_x0020_Accession_x0020_Re'
    type = 'checkbox' as FieldType
}

export class ApproveProcessingPlan extends Column {
    displayName = 'Approve Processing Plan'
    spName = 'Approve_x0020_Processing_x0020_P'
    type = 'checkbox' as FieldType
}

export class ApproveRequest extends Column {
    displayName = 'Approve ApproveRequest'
    spName = 'Approve_x0020_Request'
    type = 'checkbox' as FieldType
}

export class ArrangementAndDescriptionComments extends Column {
    displayName = 'Arrangement and Description Comments'
    spName = 'Arrangement_x0020_and_x0020_Desc'
    type = 'textarea' as FieldType
}

export class ArrangementAndDescriptionDate extends Column {
    displayName = 'Arrangement and Description Date'
    spName = 'Arrangement_x0020_and_x0020_Desc0'
    type = 'datetime' as FieldType
}

export class AssignedForProcessingTheCollection extends Column {
    displayName = 'Assigned for Processing the Collection'
    spName = 'Assigned_x0020_for_x0020_Process'
    type = 'checkbox' as FieldType
}

export class CallNumber extends Column {
    displayName = 'Call Number'
    spName = 'Call_x0020_Number'
    type = 'text' as FieldType
}

export class CatalogReviewApproval extends Column {
    displayName = 'Catalog Review Approval'
    spName = 'Catalog_x0020_Review_x0020_Appro'
    type = 'checkbox' as FieldType
}

export class CatalogReviewComments extends Column {
    displayName = 'Catalog Review Comments'
    spName = 'Catalog_x0020_Review_x0020_Comme'
    type = 'textarea' as FieldType
}

export class CatalogReviewDate extends Column {
    displayName = 'Catalog Review Date'
    spName = 'Catalog_x0020_Review_x0020_Date'
    type = 'datetime' as FieldType
}

export class CatalogingDate extends Column {
    displayName = 'Cataloging Date'
    spName = 'Cataloging_x0020_Date'
    type = 'datetime' as FieldType
}

export class CatalogingDone extends Column {
    displayName = 'Cataloging Done'
    spName = 'Cataloging_x0020_Done'
    type = 'checkbox' as FieldType
}

export class CollectingArea extends Column {
    displayName = 'Collecting Area'
    spName = 'Collecting_x0020_AreaId'
    type = 'lookup' as FieldType
}

export class CollectionLocationAssigned extends Column {
    displayName = 'Collection Location Assigned'
    spName = 'Collection_x0020_Location_x0020_'
    type = 'checkbox' as FieldType
}

export class CollectionManagementApproval extends Column {
    displayName = 'Collection Management Approval'
    spName = 'Collection_x0020_Management_x002'
    type = 'checkbox' as FieldType
}

export class CollectionManagementComments extends Column {
    displayName = 'Collection Management Comments'
    spName = 'Collection_x0020_Management_x0020'
    type = 'textarea' as FieldType
}

export class CollectionManagementReviewDate extends Column {
    displayName = 'Collection Management Review Date'
    spName = 'Collection_x0020_Management_x0021'
    type = 'datetime' as FieldType
}

export class CollectionType extends Column {
    displayName = 'Collection Type'
    spName = 'Collection_x0020_Type'
    type = 'choice' as FieldType
    metadata = {
        choices: ['MSS', 'UA', 'FA']
    }
}

export class CommentsOnProcessingPlan extends Column {
    displayName = 'Comments on Processing Plan'
    spName = 'Comments_x0020_on_x0020_Processi'
    type = 'textarea' as FieldType
}

export class Complete extends Column {
    displayName = 'Complete'
    spName = 'Complete'
    type = 'checkbox' as FieldType
}

export class ComponentRequest extends Column {
    displayName = 'Component Request'
    spName = 'Component_x0020_Request'
    type = 'text' as FieldType
}

export class ComponentRequestID extends Column {
    displayName = 'Component Request ID'
    spName = 'Component_x0020_Request_x0020_ID'
    type = 'text' as FieldType
}

export class ConditionRecommendationsComments extends Column {
    displayName = 'Condition Recommendations - Comments'
    spName = 'Condition_x0020_Recommendations_'
    type = 'textarea' as FieldType
}

export class ConditionReportRecommendations extends Column {
    displayName = 'Condition Report - Recommendations'
    spName = 'Condition_x0020_Report_x0020__x0'
    type = 'textarea' as FieldType
}

export class CurrentArragnement extends Column {
    displayName = 'Current Arrangement'
    spName = 'Current_x0020_Arrangement'
    type = 'textarea' as FieldType
}

export class DateDelivered extends Column {
    displayName = 'Date Delivered'
    spName = 'Date_x0020_Delivered'
    type = 'datetime' as FieldType
}

export class DateOfAccessionReview extends Column {
    displayName = 'Date of Accession Review'
    spName = 'Date_x0020_of_x0020_Accession_x0'
    type = 'datetime' as FieldType
}

export class Deaccession extends Column {
    displayName = 'Deaccession'
    spName = 'Deaccession_x003F_'
    type = 'checkbox' as FieldType
}

export class DeliveryLocation extends Column {
    displayName = 'Delivery Location'
    spName = 'Delivery_x0020_Location'
    type = 'text' as FieldType
}

export class DeliveryStatus extends Column {
    displayName = 'Delivery Status'
    spName = 'Delivery_x0020_Status'
    type = 'checkbox' as FieldType
}

export class DescriptionOfProposedDeaccession extends Column {
    displayName = 'Description of Proposed Deaccession'
    spName = 'Description_x0020_of_x0020_Propo'
    type = 'textarea' as FieldType
}

export class DescriptionSpecialistReviewComments extends Column {
    displayName = 'Description Specialist Review Comments'
    spName = 'Description_x0020_Specialist_x000'
    type = 'textarea' as FieldType
}

export class DescriptionSpecialistReviewDate extends Column {
    displayName ='Description Specialist Review Date'
    spName = 'Description_x0020_Specialist_x00'
    type = 'text' as FieldType
}

export class ExpectedDeliveryDate extends Column {
    displayName = 'Expected Delivery Date'
    spName = 'Expected_x0020_Delivery_x0020_Da'
    type = 'datetime' as FieldType
}

export class ExtentInLinearFt extends Column {
    displayName = 'Extent - in linear ft'
    spName = 'Extent_x0020__x002d__x0020_in_x0'
    type = 'number' as FieldType
}

export class FindingAidUploaded extends Column {
    displayName = 'Finding Aid Uploaded'
    spName = 'Finding_x0020_Aid_x0020_Uploaded'
    type = 'checkbox' as FieldType
}

export class LabelingBarcodeLocationAssigned extends Column {
    displayName = 'Labeling Barcode Location Assigned'
    spName = 'Labeling_x0020_Barcode_x0020_Loc'
    type = 'checkbox' as FieldType
}

export class LabelingBarcodeLocationAssignedDate extends Column {
    displayName = 'Labeling Barcode Location Assigned Date'
    spName = 'Labeling_x0020_Barcode_x0020_Loc0'
    type = 'datetime' as FieldType
}

export class ListMaterialsToBePlacedIntoVault extends Column {
    displayName = 'List Materials to be Placed into Vault'
    spName = 'List_x0020_Materials_x0020_to_x0'
    type = 'textarea' as FieldType
}

export class LocationOfMaterials extends Column {
    displayName = 'Location of Materials'
    spName = 'Location_x0020_of_x0020_Material'
    type = 'textarea' as FieldType
}

export class LocationOfDelivery extends Column {
    displayName = 'Location of Delivery'
    spName = 'Location_x0020_of_x0020_Delivery'
    type = 'text' as FieldType
}

export class MonetaryValueOfMaterials extends Column {
    displayName = 'Monetary Value of Materials'
    spName = 'Monetary_x0020_Vale_x0020_of_x00'
    type = 'number' as FieldType
}

export class PickupDate extends Column {
    displayName = 'Pickup Date'
    spName = 'Pickup_x0020_Date'
    type = 'datetime' as FieldType
}

export class PickupLocation extends Column {
    displayName = 'Pickup Location'
    spName = 'Pickup_x0020_Location'
    type = 'text' as FieldType
}

export class ProcessPlanRevisionDate extends Column {
    displayName = 'Process Plan Revision Date'
    spName = 'Process_x0020_Plan_x0020_Revisio'
    type = 'datetime' as FieldType
}

export class ProcessingComplete extends Column {
    displayName = 'Processing Complete'
    spName = 'Processing_x0020_Complete'
    type = 'checkbox' as FieldType
}

export class ProcessingLevel extends Column {
    displayName = 'Processing Level'
    spName = 'Processing_x0020_Level'
    type = 'choice' as FieldType
    metadata = {
        choices: ['Minimal', 'Value Added', 'File Level']
    }
}

export class ProcessingPlanDate extends Column {
    displayName = 'Processing Plan Date'
    spName = 'Processing_x0020_Plan_x0020_Date'
    type = 'datetime' as FieldType
}

export class ProposedSeriesArrangement extends Column {
    displayName = 'Proposed Series Arrangement'
    spName = 'Proposed_x0020_Series_x0020_Arra'
    type = 'textarea' as FieldType
}

export class Restrictions extends Column {
    displayName = 'Restrictions'
    spName = 'Restrictions'
    type = 'textarea' as FieldType
}

export class RestrictionsComments extends Column {
    displayName = 'Restrictions-Comments'
    spName = 'Restrictions_x002d_Comments'
    type = 'textarea' as FieldType
}

export class ReviewDate extends Column {
    displayName = 'Review Date'
    spName = 'Review_x0020_Date'
    type = 'datetime' as FieldType
}

export class SubmittingCurator extends Column {
    displayName = 'Submitting Curator'
    spName = 'Submitting_x0020_Curator'
    type = 'text' as FieldType
}

// TODO change class name and spName to match the new dispay name: SupervisorApproval => ReviewerApproval
export class SupervisorApproval extends Column {
    displayName = 'Reviewer Approval'
    spName = 'Supervisor_x0020_Approval'
    type = 'checkbox' as FieldType
}

export class SupervisorReviewDate extends Column {
    displayName = 'Supervisor Review Date'
    spName = 'Supervisor_x0020_Review_x0020_Da'
    type = 'datetime' as FieldType
}

export class UploadDate extends Column {
    displayName = 'Upload Date'
    spName = 'Upload_x0020_Date'
    type = 'datetime' as FieldType
}

export class VaultMaterialsIncluded extends Column {
    displayName = 'Vault Materials Included'
    spName = 'Vault_x0020_Materials_x0020_Incl'
    type = 'checkbox' as FieldType
}

export class Title extends Column {
    displayName = 'Title'
    spName = 'Title'
    type = 'text' as FieldType
}

export class DescriptionOfProposedProcessing extends Column {
    displayName = 'Description of Proposed Processing'
    spName = 'Description_x0020_of_x0020_Propo0'
    type = 'textarea' as FieldType
}

export class AssignedProcessor extends Column {
    displayName = 'Assigned Processor'
    spName = 'Assigned_x0020_Processor'
    type = 'text' as FieldType
}

export class DeliveryExplanation extends Column {
    displayName = 'Delivery Explanation'
    spName = 'Deliver_x0020_Explanation'
    type = 'textarea' as FieldType
}

export class DescriptionOfDeaccessionedMaterials extends Column {
    displayName = 'Description of Deaccessioned Materials'
    spName = 'Description_x0020_of_x0020_Deacc'
    type = 'textarea' as FieldType
}

export class PickupShelvingLocation extends Column {
    displayName = 'Pickup Shelving Location'
    spName = 'Pickup_x0020_Shelving_x0020_Loca'
    type = 'text' as FieldType
}

export class PickupShelvingDate extends Column {
    displayName = 'Pickup Shelving Date'
    spName = 'Pickup_x0020_Shelving_x0020_Date'
    type = 'datetime' as FieldType
}

export class LabelingDate extends Column {
    displayName = 'Labeling Date'
    spName = 'Labeling_x0020_Date'
    type = 'datetime' as FieldType
}

export class LabelingDone extends Column {
    displayName = 'Labeling Done'
    spName = 'Labeling_x0020_Done'
    type = 'checkbox' as FieldType
}

export class BarcodeDate extends Column {
    displayName = 'Barcode Date'
    spName = 'Barcode_x0020_Date'
    type = 'datetime' as FieldType
}

export class BarcodingComplete extends Column {
    displayName = 'Barcoding Complete'
    spName = 'Barcoding_x0020_Complete'
    type = 'checkbox' as FieldType
}

export class CollectionLocationAssignmentDate extends Column {
    displayName = 'Collection Location Assignment Date'
    spName = 'Collection_x0020_Assignment_x002'
    type = 'datetime' as FieldType
}

export class PreviousStage extends Column {
    displayName = 'Previous Stage'
    spName = 'Previous_x0020_Stage'
    type = 'text' as FieldType
}

export class StageComments_AssignProcessor extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0023'
    type = 'textarea' as FieldType
}

export class StageComments_AuthorityWorkReview extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x00211'
    type = 'textarea' as FieldType
}

export class StageComments_CatalogCollection extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x00212'
    type = 'textarea' as FieldType
}

export class StageComments_CollectionsManagementCollectionReview extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0028'
    type = 'textarea' as FieldType
}

export class StageComments_ContentReview extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0027'
    type = 'textarea' as FieldType
}

export class StageComments_DeliverCollection extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0025'
    type = 'textarea' as FieldType
}

export class StageComments_DescriptionSpecialistCollectionReview extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x00210'
    type = 'textarea' as FieldType
}

export class StageComments_EnterAcquisitionInformation extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x002'
    type = 'textarea' as FieldType
}

export class StageComments_EnterDescription extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0026'
    type = 'textarea' as FieldType
}

export class StageComments_FinalCuratorReview extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x00214'
    type = 'textarea' as FieldType
}

export class StageComments_LabelingBarcodeAndLocationsAssigned extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x00215'
    type = 'textarea' as FieldType
}

export class StageComments_PickupFromProcessor extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0029'
    type = 'textarea' as FieldType
}

export class StageComments_ProcessingPlan extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0020'
    type = 'textarea' as FieldType
}

export class StageComments_RequestMaterials extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0024'
    type = 'textarea' as FieldType
}

export class StageComments_RetrieveCollectionFromCurator extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0022'
    type = 'textarea' as FieldType
}

export class StageComments_ReviewAccessionRecord extends Column {
    displayName = 'Stage Comments - Review Accession Record'
    spName = 'Stage_x0020_Comments_x0020__x00216'
    type = 'textarea' as FieldType
}

export class StageComments_ReviewProcessingPlan extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x0021'
    type = 'textarea' as FieldType
}

export class StageComments_UploadingFindingAid extends Column {
    displayName = 'Stage Comments'
    spName = 'Stage_x0020_Comments_x0020__x00213'
    type = 'textarea' as FieldType
}