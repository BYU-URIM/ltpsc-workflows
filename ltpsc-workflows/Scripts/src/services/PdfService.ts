import { ListItem } from '../model/ListItem';
import * as jquery from 'jquery'

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
    pdfObject.open() // TODO REMOVE
    if(pdfObject) throw new Error('pdf edit bail out')
    const pdfArrayBuffer: ArrayBuffer = await getPdfArrayBuffer(pdfObject)
    return pdfArrayBuffer
}

// declares PdfMake document definition and returns PdfMake object by calling
// pdfmake::createPdf with the doc definition
function createListItemPdfMakeObject(listItem: ListItem): any {
    const docDefinition = {
        content: [
            { text: `LTPSC Item ${listItem.Call_x0020_Number}`, style: 'header' },
            {
                table: {
                    widths: [122, 122, 122, 122],
                    body: [
                        [
                            {
                                stack: [
                                    {text: 'Accession Number', style: 'tableHeader'},
                                    {text: `${listItem.Accession_x0020_Number}`, style: 'tableEntry' }
                                ]
                            },
                            {
                                stack: [
                                    {text: 'Approve Processing Plan', style: 'tableHeader'},
                                    {text: `${listItem.Approve_x0020_Processing_x0020_P}`, style: 'tableEntry' }
                                ]
                            },
                            {
                                stack: [
                                    {text: 'Approve Request', style: 'tableHeader'},
                                    {text: `${listItem.Approve_x0020_Request}`, style: 'tableEntry' }
                                ]
                            },
                            {
                                stack: [
                                    {text: 'Arrangement and Description Date', style: 'tableHeader'},
                                    {text: `${listItem.Arrangement_x0020_and_x0020_Desc0}`, style: 'tableEntry' }
                                ]
                            },
                        ]
                    ]
                }
            }

        ],
        styles: {
            header: {
                alignment: 'center',
                bold: true,
                margin: [0, 10, 0, 30],
                fontSize: 25
            },
            subheader: {
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 7]
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
    }

    return createPdf(docDefinition)
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