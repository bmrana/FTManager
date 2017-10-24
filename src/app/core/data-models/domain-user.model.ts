export class DomainUser {
    public DisplayName: string;
    public EmailAddress: string;
    public EmployeeID: string;
    public GivenName: string;
    public Surname: string;
    public Description: string;

    constructor(DisplayName: string,
                EmailAddress: string,
                EmployeeID: string,
                GivenName: string,
                Surname: string,
                Description: string) {
                    this.DisplayName = DisplayName;
                    this.EmailAddress = EmailAddress;
                    this.EmployeeID = EmployeeID;
                    this.GivenName = GivenName;
                    this.Surname = Surname;
                    this.Description = Description;
                }
}
