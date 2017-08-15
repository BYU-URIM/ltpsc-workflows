import { ListItem } from '../model/ListItem';
import createPdf from 'pdfmake-browserified'
import * as jquery from 'jquery'

// generates the arraybuffer containing binary pdf data that can be posted to the SP server
export async function generateListItemPdfBuffer(listItem: ListItem): Promise<ArrayBuffer> {
    const pdfObject = createPdfMakeObject(listItem)
    const pdfArrayBuffer: ArrayBuffer = await getPdfArrayBuffer(pdfObject)
    return pdfArrayBuffer
}

// declares PdfMake document definition and returns PdfMake object by calling
// pdfmake::createPdf with the document definition
function createPdfMakeObject(listItem: ListItem): {} {
    const docDefinition = {

    }

    return createPdf(docDefinition)
}

function getPdfArrayBuffer(pdfmakeObject): Promise<ArrayBuffer> {
    let bufferPromise: Promise<ArrayBuffer> = new Promise((resolve, reject) => {
        pdfmakeObject.getBuffer(bufferView => {
            const buffer: ArrayBuffer = bufferView.toArrayBuffer()
            buffer.byteLength ? resolve(buffer) : reject('error fetching pdf array buffer')
        })
    })

    return bufferPromise
}