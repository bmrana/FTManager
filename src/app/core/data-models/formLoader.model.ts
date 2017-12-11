export class FormLoader {
    docType: string;
    docID: number;
    recruitID: string;

    constructor(docType: string, docID: number, recruitID: string) {
        this.docID = docID;
        this.docType = docType;
        this.recruitID = recruitID;
    }
}
