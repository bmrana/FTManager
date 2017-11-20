export class DORRating {
    public id: number;
    public name: string;
    public value: number;
    public dorID: number;
    public catID: number;
    public remedial: number;
    public comments: string;

    constructor ( id: number,
                name: string,
                value: number,
                dorID: number,
                catID: number,
                remedial: number,
                comments: string) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.dorID = dorID;
        this.remedial = remedial;
        this.comments = comments;
        this.catID = catID;
    }
}
