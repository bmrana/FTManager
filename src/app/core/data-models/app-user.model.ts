export class AppUser {
    public DisplayName: string;
    public EmailAddress: string;
    public EmployeeID: string;
    public LastName: string;
    public FirstName: string;
    public JobAssignment: string;
    public Active: boolean;
    public RoleID: number;

    constructor(displayName: string,
        emailAddress: string,
        employeeID: string,
        firstName: string,
        lastName: string,
        jobAssignment: string,
        active: boolean,
        roleID: number) {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.EmployeeID = employeeID;
            this.LastName = lastName;
            this.FirstName = firstName;
            this.JobAssignment = jobAssignment;
            this.Active = active;
            this.RoleID = roleID;
        }
}
