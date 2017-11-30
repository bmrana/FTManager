// export class DomainUser {
//     public DisplayName: string;
//     public EmailAddress: string;
//     public EmployeeID: string;
//     public GivenName: string;
//     public Surname: string;
//     public Description: string;

//     constructor(DisplayName: string,
//                 EmailAddress: string,
//                 EmployeeID: string,
//                 GivenName: string,
//                 Surname: string,
//                 Description: string) {
//                     this.DisplayName = DisplayName;
//                     this.EmailAddress = EmailAddress;
//                     this.EmployeeID = EmployeeID;
//                     this.GivenName = GivenName;
//                     this.Surname = Surname;
//                     this.Description = Description;
//                 }
// }

import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export class DomainUser implements MicrosoftGraph.User {
    displayName?: string;
    id?: string;
    mail?: string;
    givenName?: string;
    surname?: string;
    jobTitle?: string;

    constructor(displayName?: string,
        id?: string,
        mail?: string,
        givenName?: string,
        surname?: string,
        jobTitle?: string) {
            this.displayName = displayName;
            this.id = id;
            this.mail = mail;
            this.givenName = givenName;
            this.surname = surname;
            this.jobTitle = jobTitle;
        }
}
