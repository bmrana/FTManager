export class DashboardDOR {
    public id: number;
    public lname: string;
    public fname: string;
    public dorNumber: number;
    public shiftDate: Date;
    public status: string;

    constructor(id: number, lname: string, fname: string, dorNumber: number, shiftDate: Date, status: string) {
        this.id = id;
        this.lname = lname;
        this.fname = fname;
        this.dorNumber = dorNumber;
        this.shiftDate = shiftDate;
        this.status = status;
    }
}
