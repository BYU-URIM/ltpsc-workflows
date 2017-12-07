import { Column } from './Columns';
import * as Cols from './Columns'
import { getFormattedDate } from '../utils/general';
import { StageName, StageOrder } from './Stages';
import ListDataStore from '../stores/ListDataStore';
import { generatePickupTicketPdf } from '../services/PdfService';

export interface IView {
    stageName: StageName
    columns: Array<Column>
    additionalActions?: Array<IItemAction>
}

// Item action contains data representing any button rendered to the form modal allowing a user to take action regarding the current item
// Certain view actions are built into each form modal since they appear at almost every stage: Return to previous Stage, Submit to next stage, and suspend
// Additional view actions are stored in each view object.
// action is a higher order function that binds the store instance to an onClick event handler
export interface IItemAction {
    buttonLabel: string
    buttonColor?: string
    composeAction: (store: ListDataStore) => () => void
    isHidden?: (store: ListDataStore) => boolean
}



export const EnterAquisitionInformation: IView = {
    stageName: 'Enter Aquisition Information',
    columns: [
        new Cols.Title().makeRequired(),
        new Cols.AccessionNumber().makeRequired(),
        new Cols.CallNumber().makeRequired(),
        new Cols.CollectionType().makeRequired(),
        new Cols.MonetaryValueOfMaterials().makeRequired(),
        new Cols.CollectingArea().makeRequired(),
        new Cols.SubmittingCurator().makeRequired(),
        new Cols.StageComments_EnterAcquisitionInformation()
    ],
    additionalActions: [{
        buttonLabel: 'Return to Accession Record Review',
        composeAction: function(store) {
            return store.returnEditItemToPreviousStage
        },
        isHidden(store) {
            // only show this action if the item was just sent from 'Review of Accession Record'
            return store.currentEditItemPreviousStage != 'Review of Accession Record'
        }
    }]
}

export const ProcessingPlan: IView = {
    stageName: 'Processing Plan',
    columns: [
        new Cols.Title(), 
        new Cols.AccessionNumber().makeDisplayOnly(), 
        new Cols.CallNumber().makeDisplayOnly(), 
        new Cols.CollectingArea().makeDisplayOnly(), 
        new Cols.ProcessingPlanDate().makeRequired().setDefaultValue(getFormattedDate()), 
        new Cols.ExtentInLinearFt().makeRequired(), 
        new Cols.CurrentArragnement().makeRequired(),
        new Cols.ProcessingLevel().makeRequired(), 
        new Cols.ConditionReportRecommendations(),
        new Cols.ProposedSeriesArrangement().makeRequired(), 
        new Cols.Deaccession().setDefaultValue(false),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.Restrictions(),
        new Cols.AppraisalNote(),
        new Cols.StageComments_ProcessingPlan()
    ],
    additionalActions: [{
        buttonLabel: 'generate pickup ticket',
        composeAction: function(store) {
            return store.createPickupTicket
        }
    }]
}

export const ReviewProcessingPlan: IView = {
    stageName: 'Review Processing Plan',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectingArea().makeDisplayOnly(),
        new Cols.ProcessingPlanDate().makeDisplayOnly(),
        new Cols.ExtentInLinearFt().makeDisplayOnly(),
        new Cols.CurrentArragnement(),
        new Cols.ProcessingLevel().makeRequired(),
        new Cols.ConditionRecommendationsComments(),
        new Cols.ProposedSeriesArrangement(),
        new Cols.Deaccession().makeDisplayOnly(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.Restrictions(),
        new Cols.ProcessPlanRevisionDate().makeDisplayOnly(),
        new Cols.ApproveProcessingPlan(),
        new Cols.CommentsOnProcessingPlan(),
        new Cols.StageComments_ReviewProcessingPlan()
    ]
}

export const RetrieveCollectionFromCurator: IView = {
    stageName: 'Retrieve Collection From Curator',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.PickupLocation().makeDisplayOnly(),
        new Cols.PickupDate().setDefaultValue(getFormattedDate()).makeRequired(),
        new Cols.VaultMaterialsIncluded(),
        new Cols.ListMaterialsToBePlacedIntoVault(),
        new Cols.CollectionLocationAssigned(),
        new Cols.StageComments_RetrieveCollectionFromCurator()
    ]
}

export const AssignProcessor: IView = {
    stageName: 'Assign Processor',
    columns: [
        new Cols.Title().makeRequired(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectionType().makeRequired(),
        new Cols.CollectingArea().makeRequired(),
        new Cols.DescriptionOfProposedProcessing(),
        new Cols.ApproveRequest(),
        new Cols.ReviewDate().makeRequired(),
        new Cols.AssignedProcessor(),
        new Cols.DeliveryLocation(),
        new Cols.StageComments_AssignProcessor()
    ]
}

export const RequestMaterials: IView = {
    stageName: 'Request Materials',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.LocationOfDelivery().makeRequired(),
        new Cols.StageComments_RequestMaterials()
    ]
}

export const DeliverCollection: IView = {
    stageName: 'Deliver Collection',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.LocationOfMaterials().makeDisplayOnly(),
        new Cols.ExpectedDeliveryDate().makeDisplayOnly(),
        new Cols.DeliveryLocation().makeDisplayOnly(),
        new Cols.ComponentRequest().makeDisplayOnly(),
        new Cols.ComponentRequestID().makeDisplayOnly(),
        new Cols.DeliveryStatus(),
        new Cols.DeliveryExplanation(),
        new Cols.DateDelivered().makeRequired(),
        new Cols.StageComments_DeliverCollection()
    ]
}

export const EnterDescription: IView = {
    stageName: 'Enter Description',
    columns: [
        new Cols.AssignedProcessor(),
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectingArea().makeDisplayOnly(),
        new Cols.ArrangementAndDescriptionDate().makeDisplayOnly(),
        new Cols.ExtentInLinearFt().makeDisplayOnly(),
        new Cols.ProcessingLevel().makeRequired(),
        new Cols.LocationOfMaterials().makeRequired(),
        new Cols.ConditionReportRecommendations(),
        new Cols.ConditionRecommendationsComments(),
        new Cols.Deaccession().makeDisplayOnly(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.DescriptionOfDeaccessionedMaterials(),
        new Cols.Restrictions(),
        new Cols.RestrictionsComments(),
        new Cols.VaultMaterialsIncluded(),
        new Cols.ListMaterialsToBePlacedIntoVault(),
        new Cols.StageComments_EnterDescription()
    ],
    additionalActions: [{
        buttonLabel: 'Return to Sender of Comments',
        composeAction: function(store) {
            return store.returnEditItemToPreviousStage
        },
        isHidden(store) {
            // an item can only be returned to sender of comments if it was sent from a higher stage to begin with (prevStave > curStage)
            return StageOrder.indexOf(store.currentEditItemPreviousStage) < StageOrder.indexOf(store.currentEditItem.Stage as StageName)
        }
    }]
}

export const ContentReview: IView = {
    stageName: 'Content Review',
    columns: [
        new Cols.SubmittingCurator(),
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectingArea().makeDisplayOnly(),
        new Cols.ArrangementAndDescriptionDate().makeDisplayOnly(),
        new Cols.ExtentInLinearFt().makeDisplayOnly(),
        new Cols.ProcessingLevel().makeDisplayOnly(),
        new Cols.LocationOfMaterials().makeDisplayOnly(),
        new Cols.ConditionReportRecommendations(),
        new Cols.Deaccession(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.DescriptionOfDeaccessionedMaterials(),
        new Cols.Restrictions(),
        new Cols.RestrictionsComments(),
        new Cols.VaultMaterialsIncluded(),
        new Cols.ListMaterialsToBePlacedIntoVault(),
        new Cols.SupervisorReviewDate().makeRequired(),
        new Cols.SupervisorApproval(),
        new Cols.ArrangementAndDescriptionComments(),
        new Cols.StageComments_ContentReview()
    ],
    additionalActions: [{
        buttonLabel: 'Return to Processor - Enter Description',
        composeAction: function(store) {
            return store.returnEditItemToProcessor
        }
    }]
}

export const CollectionsManagementCollectionReview: IView = {
    stageName: 'Collections Management Collection Review',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectingArea().makeDisplayOnly(),
        new Cols.ArrangementAndDescriptionDate().makeDisplayOnly(),
        new Cols.ExtentInLinearFt().makeDisplayOnly(),
        new Cols.ProcessingLevel().makeDisplayOnly(),
        new Cols.LocationOfMaterials().makeDisplayOnly(),
        new Cols.CollectionManagementReviewDate(),
        new Cols.CollectionManagementComments(),
        new Cols.ConditionReportRecommendations(),
        new Cols.ConditionRecommendationsComments(),
        new Cols.Deaccession(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.DescriptionOfDeaccessionedMaterials(),
        new Cols.Restrictions(),
        new Cols.RestrictionsComments(),
        new Cols.VaultMaterialsIncluded(),
        new Cols.ListMaterialsToBePlacedIntoVault(),
        new Cols.SupervisorReviewDate().makeRequired(),
        new Cols.SupervisorApproval(),
        new Cols.ArrangementAndDescriptionComments(),
        new Cols.StageComments_CollectionsManagementCollectionReview()
    ],
    additionalActions: [{
        buttonLabel: 'Return to Processor - Enter Description',
        composeAction: function(store) {
            return store.returnEditItemToProcessor
        }
    }]
}

export const PickupFromProcessor: IView = {
    stageName: 'Pickup from Processor',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.PickupShelvingLocation(),
        new Cols.PickupShelvingDate().makeRequired(),
        new Cols.VaultMaterialsIncluded(),
        new Cols.ListMaterialsToBePlacedIntoVault(),
        new Cols.CollectionLocationAssigned(),
        new Cols.StageComments_PickupFromProcessor()
    ]
}

export const DescriptionSpecialistCollectionReview: IView = {
    stageName: 'Description Specialist Collection Review',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectingArea().makeDisplayOnly(),
        new Cols.ArrangementAndDescriptionDate().makeDisplayOnly(),
        new Cols.ExtentInLinearFt().makeDisplayOnly(),
        new Cols.ProcessingLevel().makeDisplayOnly(),
        new Cols.LocationOfMaterials().makeDisplayOnly(),
        new Cols.ConditionReportRecommendations(),
        new Cols.ConditionRecommendationsComments(),
        new Cols.Deaccession().makeDisplayOnly(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.DescriptionOfDeaccessionedMaterials(),
        new Cols.Restrictions(),
        new Cols.RestrictionsComments(),
        new Cols.VaultMaterialsIncluded(),
        new Cols.ListMaterialsToBePlacedIntoVault(),
        new Cols.SupervisorReviewDate().makeRequired(),
        new Cols.SupervisorApproval(),
        new Cols.ArrangementAndDescriptionComments(),
        new Cols.DescriptionSpecialistReviewDate(),
        new Cols.DescriptionSpecialistReviewComments(),
        new Cols.StageComments_DescriptionSpecialistCollectionReview()
    ],
    additionalActions: [{
        buttonLabel: 'Return to Processor - Enter Description',
        composeAction: function(store) {
            return store.returnEditItemToProcessor
        }
    }]
}

export const AuthorityWorkReview: IView = {
    stageName: 'Authority Work Review',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectingArea().makeDisplayOnly(),
        new Cols.ArrangementAndDescriptionDate().makeDisplayOnly(),
        new Cols.ExtentInLinearFt().makeDisplayOnly(),
        new Cols.ProcessingLevel().makeDisplayOnly(),
        new Cols.LocationOfMaterials().makeDisplayOnly(),
        new Cols.ConditionReportRecommendations().makeDisplayOnly(),
        new Cols.ConditionRecommendationsComments(),
        new Cols.Deaccession().makeDisplayOnly(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.DescriptionOfDeaccessionedMaterials(),
        new Cols.Restrictions(),
        new Cols.RestrictionsComments(),
        new Cols.SupervisorReviewDate(),
        new Cols.SupervisorApproval().makeDisplayOnly(),
        new Cols.ArrangementAndDescriptionComments(),
        new Cols.CatalogReviewDate(),
        new Cols.CatalogReviewComments(),
        new Cols.StageComments_AuthorityWorkReview()
    ],
    additionalActions: [{
        buttonLabel: 'Return to Processor - Enter Description',
        composeAction: function(store) {
            return store.returnEditItemToProcessor
        }
    }]
}

export const FinalCuratorReview: IView = {
    stageName: 'Final Curator Review',
    columns: [
        new Cols.SubmittingCurator().makeDisplayOnly(),
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectingArea().makeDisplayOnly(),
        new Cols.ArrangementAndDescriptionDate().makeDisplayOnly(),
        new Cols.ExtentInLinearFt().makeDisplayOnly(),
        new Cols.ProcessingLevel().makeDisplayOnly(),
        new Cols.LocationOfMaterials().makeDisplayOnly(),
        new Cols.ConditionReportRecommendations(),
        new Cols.ConditionRecommendationsComments(),
        new Cols.Deaccession().makeDisplayOnly(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.DescriptionOfDeaccessionedMaterials(),
        new Cols.Restrictions(),
        new Cols.RestrictionsComments(),
        new Cols.VaultMaterialsIncluded(),
        new Cols.ListMaterialsToBePlacedIntoVault(),
        new Cols.SupervisorReviewDate().makeRequired(),
        new Cols.SupervisorApproval(),
        new Cols.ArrangementAndDescriptionComments(),
        new Cols.StageComments_FinalCuratorReview()
    ]
}

export const CatalogCollection: IView = {
    stageName: 'Catalog Collection',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.CollectingArea().makeDisplayOnly(),
        new Cols.CatalogingDate().setDefaultValue(getFormattedDate()).makeRequired(),
        new Cols.CatalogingDone().makeRequired(),
        new Cols.StageComments_CatalogCollection()
    ]
}

export const UploadingFindingAid: IView = {
    stageName: 'Uploading Finding Aid',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.UploadDate().setDefaultValue(getFormattedDate()).makeRequired(),
        new Cols.FindingAidUploaded().makeRequired(),
        new Cols.StageComments_UploadingFindingAid()
    ]
}

export const LabelingBarcodeAndLocationAssigned: IView = {
    stageName: 'Labeling Barcode And Locations Assigned',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.LabelingDate().setDefaultValue(getFormattedDate()),
        new Cols.LabelingDone().makeRequired(),
        new Cols.BarcodeDate().setDefaultValue(getFormattedDate()),
        new Cols.BarcodingComplete().makeRequired(),
        new Cols.CollectionLocationAssignmentDate().setDefaultValue(getFormattedDate()).makeRequired(),
        new Cols.CollectionLocationAssigned().makeRequired(),
        new Cols.StageComments_LabelingBarcodeAndLocationsAssigned()
    ]
}

export const ReviewOfAccessionRecord: IView = {
    stageName: 'Review of Accession Record',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.DateOfAccessionReview(),
        new Cols.ApproveAccessionRecord(),
        new Cols.StageComments_ReviewAccessionRecord()
    ],
    additionalActions: [{
        buttonLabel: 'Return to Curator - Enter Acquisition Information',
        composeAction: function(store) {
            return store.returnEditItemToCurator
        }
    }]
}

export const Suspended: IView = {
    stageName: 'Suspended',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.PreviousStage().makeDisplayOnly()
    ],
    additionalActions: [{
        buttonLabel: 'End Suspension - Return to Previous Stage',
        composeAction: function(store) {
            return store.returnEditItemToPreviousStage
        }
    }]
}

export const DEAFULT_VIEW: IView = {
    stageName: 'Default',
    columns: []
}
