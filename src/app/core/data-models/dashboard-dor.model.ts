export class DashboardDOR {
    public id: number;
    public lname: string;
    public fname: string;
    public dor_number: number;
    public shiftDate: Date;
    public status: string;

    constructor(id: number, lname: string, fname: string, dor_number: number, shiftDate: Date, status: string) {
        this.id = id;
        this.lname = lname;
        this.fname = fname;
        this.dor_number = dor_number;
        this.shiftDate = shiftDate;
        this.status = status;
    }
}
