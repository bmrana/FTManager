export class DashboardDOR {
    public id: number;
    public lname: string;
    public fname: string;
    public fto_lname: string;
    public fto_fname: string;
    public dor_number: number;
    public shiftDate: Date;
    public status: string;

    constructor(id: number, lname: string, fname: string, fto_lname: string,
        fto_fname: string, dor_number: number, shiftDate: Date, status: string) {
        this.id = id;
        this.lname = lname;
        this.fname = fname;
        this.fto_fname = fto_fname;
        this.fto_lname = fto_lname;
        this.dor_number = dor_number;
        this.shiftDate = shiftDate;
        this.status = status;
    }
}
