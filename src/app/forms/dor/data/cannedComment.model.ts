export class CannedComment {
    public catID: number;
    public commentID: number;
    public selected: boolean;

    constructor(catID: number, commentID: number, selected: boolean) {
        this.catID = catID;
        this.commentID = commentID;
        this.selected = selected;
    }
}
