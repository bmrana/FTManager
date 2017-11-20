export class DashboardDOR {
    public lname: string;
    public fname: string;
    public dorNumber: number;
    public shiftDate: Date;
    public status: string;

    constructor(lname: string, fname: string, dorNumber: number, shiftDate: Date, status: string) {
        this.lname = lname;
        this.fname = fname;
        this.dorNumber = dorNumber;
        this.shiftDate = shiftDate;
        this.status = status;
    }
}
