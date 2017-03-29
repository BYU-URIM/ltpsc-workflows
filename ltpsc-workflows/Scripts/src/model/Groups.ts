import * as Views from './Views'

export interface IGroup {
    name: string
    permittedViews: Array<Views.IView>
}

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

export const Processor: IGroup = {
    name: 'Processor',
    permittedViews: [ Views.EnterDescription ]
}

export const DescriptionSpecialist: IGroup = {
    name: 'Description Specialist',
    permittedViews: [ Views.DescriptionSpecialistTiCollectionReview ]
}

export const Cataloging: IGroup = {
    name: 'Cataloging',
    permittedViews: [ Views.AuthorityWorkReview, Views.CatalogCollection, Views.UploadingFindingAid ]
}