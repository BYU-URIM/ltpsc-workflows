import * as Views from './Views'
import { StageName } from './Stages';

interface IGroup {
    name: string
    permittedViews: Array<Views.IView>
}
export default IGroup

export const Curator: IGroup = {
    name: 'Curator',
    permittedViews: [ Views.EnterAquisitionInformation, Views.ProcessingPlan, Views.ContentReview, Views.FinalCuratorReview ]
}

export const CPUSupervisor: IGroup = {
    name: 'CPU Supervisor',
    permittedViews: [ Views.ReviewProcessingPlan, Views.AssignProcessor ]
}

export const CollectionsManagement: IGroup = {
    name: 'Collections Management',
    permittedViews: [ 
        Views.RetrieveCollectionFromCurator, Views.DeliverCollection, Views.CollectionsManagementCollectionReview,
        Views.PickupFromProcessor, Views.LabelingBarcodeAndLocationAssigned
    ]
}

export const CollectionsManagementSpecialist: IGroup = {
    name: 'Collections Management Specialist',
    permittedViews: [
        Views.ReviewOfAccessionRecord
    ]
}

export const Processor: IGroup = {
    name: 'Processor',
    permittedViews: [ Views.RequestMaterials, Views.EnterDescription ]
}

export const DescriptionSpecialist: IGroup = {
    name: 'Description Specialist',
    permittedViews: [ Views.DescriptionSpecialistCollectionReview ]
}

export const Cataloging: IGroup = {
    name: 'Cataloging',
    permittedViews: [ Views.CatalogCollection, Views.UploadingFindingAid ]
}

export const AuthorityAndSubjectSpecialist: IGroup = {
    name: 'Authority and Subject Specialist',
    permittedViews: [ Views.AuthorityWorkReview ]
}

export const AdminOnly: IGroup = {
    name: 'Admin Only',
    permittedViews: [ Views.Suspended ]
}