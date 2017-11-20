export class DORComment {
    public id: number;
    public categoryID: number;
    public comment: string;
    public prefix: number;

    constructor ( id: number,
                categoryID: number,
                comment: string,
                prefix: number) {
                    this.id = id;
                    this.categoryID = categoryID;
                    this.comment = comment;
                    this.prefix = prefix;
    }
}
