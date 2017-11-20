export class CategoryRating {
    public catID: number;
    public rating: number;
    public remedial: number;
    public otherComments: string;

    constructor(catID: number, rating: number, remedial: number, otherComments: string) {
        this.catID = catID;
        this.rating = rating;
        this.remedial = remedial;
        this.otherComments = otherComments;
    }
}
