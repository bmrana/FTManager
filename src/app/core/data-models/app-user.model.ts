export class AppUser {
    public DisplayName: string;
    public EmailAddress: string;
    public EmployeeID: string;
    public LastName: string;
    public FirstName: string;
    public JobAssignment: string;
    public RoleID: number;

    constructor(displayName: string,
        emailAddress: string,
        employeeID: string,
        firstName: string,
        lastName: string,
        jobAssignment: string,
        roleID: number) {
            this.DisplayName = displayName;
            this.EmailAddress = emailAddress;
            this.EmployeeID = employeeID;
            this.LastName = firstName;
            this.FirstName = firstName;
            this.JobAssignment = jobAssignment;
            this.RoleID = roleID;
        }
}
