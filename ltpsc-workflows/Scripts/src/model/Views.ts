import { Column } from './Columns';
import * as Cols from './Columns'
import { getFormattedDate } from '../utils/general';
import { StageName } from './Stages';

export interface IView {
    stageName: StageName
    columns: Array<Column>
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
        new Cols.SubmittingCurator().makeRequired()
    ]
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
        new Cols.Deaccession(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.Restrictions()
    ]
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
        new Cols.ApproveProcessingPlan(),
        new Cols.CommentsOnProcessingPlan()
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
        new Cols.CollectionLocationAssigned()
    ]
}

export const AssignProcessor: IView = {
    stageName: 'Assign Processor',
    columns: [
        new Cols.Title().makeRequired(),
        new Cols.CallNumber(),
        new Cols.CollectionType().makeRequired(),
        new Cols.CollectingArea().makeRequired(),
        new Cols.DescriptionOfProposedProcessing(),
        new Cols.ApproveRequest(),
        new Cols.ReviewDate().makeRequired(),
        new Cols.AssignedProcessor(),
        new Cols.DeliveryLocation()
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
        new Cols.DateDelivered().makeRequired()
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
        new Cols.ListMaterialsToBePlacedIntoVault()
    ]
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
        new Cols.ArrangementAndDescriptionCmments()
    ]
}

export const CollectionsManagementCollectionReview: IView = {
    stageName: 'Collections Management Collections Review',
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
        new Cols.Deaccession(),
        new Cols.DescriptionOfProposedDeaccession(),
        new Cols.DescriptionOfDeaccessionedMaterials(),
        new Cols.Restrictions(),
        new Cols.RestrictionsComments(),
        new Cols.VaultMaterialsIncluded(),
        new Cols.ListMaterialsToBePlacedIntoVault(),
        new Cols.SupervisorReviewDate().makeRequired(),
        new Cols.SupervisorApproval(),
        new Cols.ArrangementAndDescriptionCmments()
    ]
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
        new Cols.CollectionLocationAssigned()
    ]
}

export const DescriptionSpecialistTiCollectionReview: IView = {
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
        new Cols.ArrangementAndDescriptionCmments()
    ]
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
        new Cols.ArrangementAndDescriptionCmments(),
        new Cols.CollectionManagementReviewDate(),
        new Cols.CollectionManagementComments(),
        new Cols.CatalogReviewDate(),
        new Cols.CatalogReviewComments()
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
        new Cols.CatalogingDone().makeRequired()
    ]
}

export const UploadingFindingAid: IView = {
    stageName: 'Uploading Finding Aid',
    columns: [
        new Cols.Title().makeDisplayOnly(),
        new Cols.AccessionNumber().makeDisplayOnly(),
        new Cols.CallNumber().makeDisplayOnly(),
        new Cols.UploadDate().setDefaultValue(getFormattedDate()).makeRequired(),
        new Cols.FindingAidUploaded().makeRequired()
    ]
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
        new Cols.ArrangementAndDescriptionCmments()
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
        new Cols.CollectionLocationAssigned().makeRequired()
    ]
}

export const DEAFULT_VIEW: IView = {
    stageName: 'Default',
    columns: []
}
