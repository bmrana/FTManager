export class FormLoader {
    docType: string;
    docID: number;

    constructor(docType: string, docID: number) {
        this.docID = docID;
        this.docType = docType;
    }
}
