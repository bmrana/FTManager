import { FormData } from './../../forms/dor/data/dor-form-data.model';
import { Observable } from 'rxjs/Observable';
import { WebConnectServiceService } from './../web-services/web-connect-service.service';
import { Injectable } from '@angular/core';

import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';
import { AppUser } from '../data-models/app-user.model';
import { RecursiveTemplateAstVisitor } from '@angular/compiler';

@Injectable()
export class EmailService {
  message: MicrosoftGraph.Message;
  me: MicrosoftGraph.User;
  html = `<html lang="en">
  <head>
    <meta charset="utf-8">
  
  </head>
  <body>
    <table>
    <tr>
      <td>
        <h3>Recruit Name: </h3>
        <h4>DOR #:</h4>
        <p>FTO:</p>
        <p>Shift Date:</p>
        <p>Click here to view</p>
      <td>
    </tr>
    </table>
  </body>
  </html>`;

  constructor(private httpService: WebConnectServiceService) { }

  constructMessage(dorFormData: FormData, emailType: string): MicrosoftGraph.Message {
    this.message = {
      subject: dorFormData.fto.DisplayName + ' has completed a DOR for ' + dorFormData.recruit.DisplayName + '.',
      toRecipients: this.getRecipients([dorFormData.fto, dorFormData.recruit]),
      body: {
        content: `<html lang="en">
        <head>
          <meta charset="utf-8">
        
        </head>
        <body>
          <table>
          <tr>
            <td>
              <h3>Recruit Name: ` + dorFormData.recruit.DisplayName + `</h3>
              <h4>DOR #: ` + dorFormData.dorNumber + ` </h4>
              <p>FTO: ` + dorFormData.fto.DisplayName + `</p>
              <p>Shift Date: ` + dorFormData.shiftDate + `</p>
              <p>Please <a href="https://fto.dentontraining.com">login</a> to view this DOR from your dashboard.</p>
            <td>
          </tr>
          </table>
        </body>
        </html>`,
        contentType: 'html'
      }
    };
    return this.message;
  }

  getRecipients(recipients: AppUser[]): MicrosoftGraph.Recipient[] {
    var recips: MicrosoftGraph.Recipient[] = [];
    for (let recipient of recipients) {
      // addresses.push({ name: recipient.DisplayName, address: recipient.EmailAddress });
      recips.push({emailAddress: {name: recipient.DisplayName, address: recipient.EmailAddress}});
    }
    recips.push({emailAddress: {name: 'Rana, Brandon M.', address: 'brandon.rana@gmail.com'}});
    
    return recips;
  }

  sendMail(mail: MicrosoftGraph.Message) {
    var client = this.httpService.getClient();
    return Observable.fromPromise(
      client
        .api('me/sendmail')
        .post({message: mail})
    );
  }

  
}
