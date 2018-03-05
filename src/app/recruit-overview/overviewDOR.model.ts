export class OverviewDOR {
    id: number;
    recruitEmpID: string;
    ftoEmpID: string;
    phase: number;
    dor_number: number;
    shiftDate: Date;
    recruitLastName: string;
    recruitFirstName: string;
    ftoLastName: string;
    ftoFirstName: string;
    finalized: boolean;
    reviewed: boolean;

    constructor(recruitEmpID: string, ftoEmpID: string, phase: number, dor_number: number, shiftDate: Date, recruitLastName: string,
        recruitFirstName: string, ftoLastName: string, ftoFirstName: string, finalized: boolean, reviewed: boolean, id: number) {
            this.id = id;
            this.dor_number = dor_number;
            this.finalized = finalized;
            this.ftoEmpID = ftoEmpID;
            this.ftoFirstName = ftoFirstName;
            this.ftoLastName = ftoLastName;
            this.phase = phase;
            this.recruitEmpID = recruitEmpID;
            this.recruitFirstName = recruitFirstName;
            this.recruitLastName = recruitLastName;
            this.reviewed = reviewed;
            this.shiftDate = shiftDate;
        }
}
