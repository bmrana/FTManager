import { CryptoService } from './crypto.service';

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

  constructor(private httpService: WebConnectServiceService, private cryptoService: CryptoService) { }

  constructMessage(dorFormData: FormData, emailType: string): MicrosoftGraph.Message {
    const encRecruit: string = this.cryptoService.getEncString(dorFormData.recruit.EmployeeID);
    const encDocID: string = this.cryptoService.getEncString(dorFormData.dorNumber.toString());
    const encDocType: string = this.cryptoService.getEncString(emailType);

    this.message = {
      subject: dorFormData.fto.DisplayName + ' has completed a DOR for ' + dorFormData.recruit.DisplayName + '.',
      toRecipients: this.getRecipients([dorFormData.fto, dorFormData.recruit]),
      body: {
        content: `<html lang="en">

        <head>
            <meta charset="utf-8">
            <link href="https://fonts.googleapis.com/css?family=Noto+Sans" rel="stylesheet">
            <style>
                body {
                    font-family: 'Noto Sans', sans-serif;
                }

                .row {
                    margin-bottom: 30px;
                }

                .container {
                    background-color: white;
                    padding: 20px;
                    margin: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
            <div>
                <h3> ` + dorFormData.recruit.DisplayName + `</h3>
                <h4>DOR #: ` + dorFormData.dorNumber + `
                <a href="https://fto.dentontraining.com/?docType=` + encDocType + `&docID=` + encDocID +
                  `&jedi=` + encRecruit + `">View this DOR</a></h4>
                <p>FTO: ` + dorFormData.fto.DisplayName + `</p>
                <p>Shift Date: ` + dorFormData.shiftDate + `</p>
                <hr>
            </div>
            <div class="row">
                <h4>Most Acceptable Performance</h4>
                <p>` + dorFormData.mostAcceptable + `</p>
            </div>
            <div class="row">
                <h4>Least Acceptable Performance</h4>
                <p>` + dorFormData.leastAcceptable + `</p>
            </div>
            <div class="row">
                <h4>Other FTO Comments</h4>
                <p>` + dorFormData.otherComments + `</p>
            </div>
            <hr>
            <div>
                <p>Please
                    <a href="https://fto.dentontraining.com">login</a> to go to your dashboard.</p>
            </div>
        </div>
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
    recips.push({emailAddress: {name: 'Willenbrock, Paul R.', address: 'paul.willenbrock@cityofdenton.com'}});
    recips.push({emailAddress: {name: 'Rana, Brandon M.', address: 'brandon.rana@cityofdenton.com'}});
    
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
