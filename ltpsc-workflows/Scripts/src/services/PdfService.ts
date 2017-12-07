import { ListItem } from '../model/ListItem';
import * as jquery from 'jquery'
import { ColumnHeaderStyle } from '../components/ListDataTable/Styles_ListDataTable';

// decalaration of export from external library pdfmake (NOTE client pdfmake is not available on npm)
declare const createPdf

// generates print label pdf and opens the pdf in a new tab
export function generatePickupTicketPdf(listItem: ListItem): void {
    createPickupTicketPdf(listItem).open()
}

function createPickupTicketPdf(listItem: ListItem) {
    const docDefinition = {
        content: [
            { text: `Location of Material: ${listItem.Location_x0020_of_x0020_Material}`, bold: true, alignment: 'center', margin: [0, 100, 0, 30], fontSize: 25 },
            { text: `Call Number: ${listItem.Call_x0020_Number}`, bold: true, alignment: 'center', margin: [0, 10, 0, 30], fontSize: 25 },
            { text: `Collection Type: ${listItem.Collection_x0020_Type}`, bold: true, alignment: 'center', margin: [0, 10, 0, 30], fontSize: 25 },
        ]
    }

    return createPdf(docDefinition)
}

// generates the arraybuffer containing binary pdf data that can be posted to the SP server
export async function generateListItemPdfBuffer(listItem: ListItem): Promise<ArrayBuffer> {
    const pdfObject = createListItemPdfMakeObject(listItem)
    const pdfArrayBuffer: ArrayBuffer = await getPdfArrayBuffer(pdfObject)
    return pdfArrayBuffer
}

function getPdfArrayBuffer(pdfmakeObject): Promise<ArrayBuffer> {
    let bufferPromise: Promise<ArrayBuffer> = new Promise((resolve, reject) => {
        pdfmakeObject.getBuffer((bufferView: Uint8Array) => {
            const buffer: ArrayBuffer = bufferView.buffer
            buffer.byteLength ? resolve(buffer) : reject('error fetching pdf array buffer')
        })
    })

    return bufferPromise
}

// declares PdfMake document definition and returns PdfMake object by calling
// pdfmake::createPdf with the doc definition object
function createListItemPdfMakeObject(listItem: ListItem): any {
    const docDefinition = generateListItemPdfDefinition([
        {header: `LTPSC Item ${listItem.Call_x0020_Number}`},

        // ENTER ACQUISITION INFORMATION
        {subheader: 'Enter Acquisition Information'},
        {table: {
            'Title': listItem.Title,
            'Accession Number': listItem.Accession_x0020_Number,
            'Call Numbert': listItem.Call_x0020_Number,
            'Collection Type': listItem.Collection_x0020_Type,
        }},
        {table: {
            'Monetary Value of Materials': listItem.Monetary_x0020_Vale_x0020_of_x00,
            'Collecting Area': listItem.Collecting_x0020_AreaId,
            'Submitting Curator': listItem.Submitting_x0020_Curator
        }},
        {table: {
            'Stage Comments - Enter Acquisition Information': listItem.Stage_x0020_Comments_x0020__x002
        }},

        // PROCESSING PLAN
        {subheader: 'Processing Plan'},
        {table: {
            'Processing Plan Date': listItem.Processing_x0020_Plan_x0020_Date,
            'Extent In Linear Feature': listItem.Extent_x0020__x002d__x0020_in_x0,
            'Current Arrangement': listItem.Current_x0020_Arrangement
        }},
        {table: {
            'Processing Level': listItem.Processing_x0020_Level,
            'Deaccession': listItem.Deaccession_x003F_,
            'Restrictions': listItem.Restrictions
        }},
        {table: {
            'Condition Report - Recommendations': listItem.Condition_x0020_Recommendations_,
            'Appriasal Note': listItem.Appraisal_x0020_Note
        }},
        {table: {
            'Proposed Series Arrangement': listItem.Proposed_x0020_Series_x0020_Arra,
            'Description of Proposed Deaccession': listItem.Description_x0020_of_x0020_Propo
        }},
        {table: {
            'Stage Comments - Processing Plan': listItem.Stage_x0020_Comments_x0020__x0020
        }},

        // REVIEW PROCESSING PLAN
        {subheader: 'Review Processing Plan'},
        {table: {
            'Approve Processing Plan': listItem.Approve_x0020_Processing_x0020_P,
            'Processing Plan Revision Date': listItem.Process_x0020_Plan_x0020_Revisio
        }},
        {table: {
            'Condition Recommendations Comments': listItem.Condition_x0020_Recommendations_,
            'Comments on Processing Plan': listItem.Comments_x0020_on_x0020_Processi,
        }},
        {table: {
            'Stage Comments - Review Processing Plan': 'Stage_x0020_Comments_x0020__x0021'
        }},

        // RETRIEVE COLLECTION FROM CURATOR
        {subheader: 'Retrieve Collection from Curator'},
        {table: {
            'Pickup Location': listItem.Pickup_x0020_Location,
            'Pickup Date': listItem.Pickup_x0020_Date,
            'Valut Matrials Included': listItem.Vault_x0020_Materials_x0020_Incl
        }},
        {table: {
            'List Materials to be Placed into Vault': listItem.List_x0020_Materials_x0020_to_x0,
            'Collection Location Assigned': listItem.Collection_x0020_Location_x0020_,
        }},
        {table: {
            'Stage Comments - Retrieve Collection from Curator': listItem.Stage_x0020_Comments_x0020__x0022
        }},

        // ASSIGN PROCESSOR
        {subheader: 'Assign Processor'},
        {table: {
            'Approve Request': listItem.Approve_x0020_Request,
            'Review Date': listItem.Review_x0020_Date,
            'Assigned Processor': listItem.Assigned_x0020_Processor,
            'Delivery Location': listItem.Delivery_x0020_Location
        }},
        {table:{
            'Description of Proposed Processing': listItem.Description_x0020_of_x0020_Propo0
        }},
        {table:{
            'Stage Comments - Assign Processor': listItem.Stage_x0020_Comments_x0020__x0023
        }},

        // REQUEST MATERIALS
        {subheader: 'Request Materials'},
        {table: {
            'Location of Delivery': listItem.Location_x0020_of_x0020_Delivery,
            'Stage Comments - Request Materials': listItem.Stage_x0020_Comments_x0020__x0024
        }},

        // DELIVER COLLECTION
        {subheader: 'Deliver Collection'},
        {table: {
            'Location of Materials': listItem.Location_x0020_of_x0020_Material,
            'Expected Delivery Date': listItem.Expected_x0020_Delivery_x0020_Da,
            'Component Request': listItem.Component_x0020_Request,
            'Component Request ID': listItem.Component_x0020_Request_x0020_ID
        }},
        {table: {
            'Delivery Status': listItem.Delivery_x0020_Status,
            'Delivery Explanation': listItem.Deliver_x0020_Explanation,
            'Date Delivered': listItem.Date_x0020_Delivered
        }},
        {table: {
            'Stage Comments - Deliver Collection': listItem.Stage_x0020_Comments_x0020__x0025
        }},

        // ENTER DESCRIPTION
        {subheader: 'Enter Description'},
        {table: {
            'Restrictions': listItem.Restrictions,
            'Restrictions Comments': listItem.Restrictions_x002d_Comments
        }},
        {table: {
            'Description of Deaccessioned Materials': listItem.Description_x0020_of_x0020_Deacc,
            'Arrangement and Description Date': listItem.Arrangement_x0020_and_x0020_Desc0
        }},
        {table: {
            'Stage Comments - Enter Description': listItem.Stage_x0020_Comments_x0020__x0026
        }},

        // CONTENT REVIEW
        {subheader: 'Content Review'},
        {table: {
            'Supervisor Review Date': listItem.Supervisor_x0020_Review_x0020_Da,
            'Supervisor Approval': listItem.Supervisor_x0020_Approval
        }},
        {table: {
            'Arrangement and Description Comments': listItem.Arrangement_x0020_and_x0020_Desc,
            'Stage Comments - Content Review': listItem.Stage_x0020_Comments_x0020__x0027
        }},

        // COLLECTIONS MANAGEMENT COLLECTION REVIEW
        {subheader: 'Collections Management Collection Review'},
        {table: {
            'Stage Comments: Collections Management Collection Review': listItem.Stage_x0020_Comments_x0020__x0028
        }},

        // PICKUP FROM PROCESSOR
        {subheader: 'Pickup from Processor'},
        {table: {
            'Pickup Shelving Location': listItem.Pickup_x0020_Shelving_x0020_Loca,
            'Pickup Shelving Date': listItem.Pickup_x0020_Shelving_x0020_Date
        }},
        {table: {
            'Stage Comments: Pickup from Processor': listItem.Stage_x0020_Comments_x0020__x0029
        }},

        // DESCRIPTION SPECIALIST COLLECTION REVIEW
        {subheader: 'Description Specialist Collection Review'},
        {table: {
            'Stage Comments - Description Specialist Collections Review': listItem.Stage_x0020_Comments_x0020__x00210
        }},

        // AUTHORITY WORK REVIEW
        {subheader: 'Authority Work Review'},
        {table: {
            'Collection Management Review Date': listItem.Collection_x0020_Management_x0021,
            'Collection Management Comments': listItem.Collection_x0020_Management_x0020,
        }},
        {table: {
            'Catalog Review Date': listItem.Catalog_x0020_Review_x0020_Date,
            'Catalog Review Comments': listItem.Catalog_x0020_Review_x0020_Comme
        }},
        {table: {
            'Stage Comments - Authority Work Review': listItem.Stage_x0020_Comments_x0020__x00211
        }},

        // FINAL CURATOR REVIEW
        {subeader: 'Final Curator Review'},
        {table: {
            'Stage Comments - Catalog Collection': listItem.Stage_x0020_Comments_x0020__x00214
        }},

        // CATALOG COLLECTION
        {subheader: 'Catalog Collection'},
        {table: {
            'Cataloging Date': listItem.Cataloging_x0020_Date,
            'Cataloging Done': listItem.Cataloging_x0020_Done
        }},
        {table: {
            'Stage Comments - Catalog Collection': listItem.Stage_x0020_Comments_x0020__x00213
        }},

        // UPLOADING FINDING AID
        {subheader: 'Upload Finding Aid'},
        {table: {
            'Upload Date': listItem.Upload_x0020_Date,
            'Finding Aid Uploaded': listItem.Finding_x0020_Aid_x0020_Uploaded
        }},
        {table: {
            'Stage Comments - Upload Finding Aid': listItem.Stage_x0020_Comments_x0020__x00213
        }},

        // LABELING BARCODE AND LOCATIONS ASSIGNED
        {subheader: 'Labeling Barcode and Location Assigned'},
        {table: {
            'Labeling Date': listItem.Labeling_x0020_Date,
            'Labeling Done': listItem.Labeling_x0020_Done,
            'Barcode Date': listItem.Barcode_x0020_Date
        }},
        {table: {
            'Barcoding Complete': listItem.Barcoding_x0020_Complete,
            'Collection Location Assignment Date': listItem.Collection_x0020_Assignment_x002
        }},
        {table: {
            'Stage Comments - Labeling Barcode and Location Assigned': listItem.Stage_x0020_Comments_x0020__x00214
        }}

    ])
    return createPdf(docDefinition)
}


// factory function returning definition object that can be fed to createPdf()
// it accepts a smaller JSON and basically turns it into a larger JSON - the doc definition specified by pdfmake
// @param rowArray: pdf is divided into rows which can either be a header row, a subheader row, or table row
// each row has specific styles built into it - header and subheader have large margins while table rows have no margins
// this means that each consecutive table row will share a border making them part of the same table
// SHAPE OF ROW ARRAY:
// [{header: 'header text'}, {subeader: 'subheader text'}, {table: { entryHeader: entryValue, entryHeader: entryValue } } ]
function generateListItemPdfDefinition(rowArray: any[]): {} {
    const doc: any = {}
    // column widths for rows with 1 - 4 equal columns
    const widthArrays = [
        [509],
        [250, 250],
        [164, 163, 164],
        [121, 120, 120, 121]
    ]

    doc.styles = {
        header: {
            alignment: 'center',
            bold: true,
            margin: [0, 10, 0, 30],
            fontSize: 25
        },
        subheader: {
            fontSize: 18,
            bold: true,
            margin: [0, 25, 0, 7]
        },
        tableHeader: {
            bold: true,
            fontSize: 11,
        },
        tableEntry: {
            color: '#7F7D7D',
            bold: true,
            margin: [0, 4, 0, 0]
        }
    }

    doc.content = []

    rowArray.forEach((row, i) => {
        doc.content[i] = {}
        if(row.header) {
            doc.content[i].text = row.header
            doc.content[i].style = 'header'
        } else if(row.subheader) {
            doc.content[i].text = row.subheader
            doc.content[i].style = 'subheader'
            doc.content[i].headlineLevel = 1
        } else if(row.table) {
            doc.content[i].table = {}
            doc.content[i].table.widths = widthArrays[Object.keys(row.table).length - 1]
            doc.content[i].table.body  = [[]] // each table body is an object of entry headers to entry values
            for(let entryHeader in row.table) {
                const tableEntry = {
                    stack: [
                        {text: entryHeader, style: 'tableHeader', headlineLevel: 2},
                        {text: row.table[entryHeader] || ' ', style: 'tableEntry', headlineLevel: 2 }
                    ]
                }
                doc.content[i].table.body[0].push(tableEntry)
            }
        }
    })

    doc.pageBreakBefore = function(currentNode, followingNodesOnPage: Array<any>, nodesOnNextPage: Array<any>, previousNodesOnPage: Array<any>) {
        return currentNode.style === 'subheader' && !followingNodesOnPage.find(node => node.style === 'subheader')
    }

    return doc
}