import { Subject } from 'rxjs/Subject';
import { DashboardService } from './../services/dashboard.service';
import { DashboardDOR } from './../data-models/dashboard-dor.model';
import { DorFormDataService } from './../../forms/dor/data/dor-form-data.service';
import { DorService } from './../services/dor.service';
import { AppUser } from './../data-models/app-user.model';
import { UsersService } from './../services/users.service';
import { DomainUser } from './../data-models/domain-user.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient,
          HttpParams,
          HttpRequest,
          HttpErrorResponse,
          HttpHeaders } from '@angular/common/http';
import { FormData } from '../../forms/dor/data/dor-form-data.model';
import * as hello from 'hellojs/dist/hello.all.js';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as MicrosoftGraphClient from '@microsoft/microsoft-graph-client';

@Injectable()
export class WebConnectServiceService {
  headers = new HttpHeaders({ 'Content-Type' : 'application/json' });
  // serviceURL = 'http://localhost:57321/';
  serviceURL = 'https://services.dentontraining.com/';
  url = 'https://graph.microsoft.com';
  policeUsers: MicrosoftGraph.User[];
  token = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private users: UsersService,
    private dorService: DorService,
    private dorFormService: DorFormDataService,
    private dashboardService: DashboardService) {}

    // fetchAllUsers() {
    //   return this.http.get<DomainUser[]>('http://localhost:62675/ADService.svc/getUsers')
    //   .map(
    //     (domainUsers) => {
    //       this.users.setDomainUsers(domainUsers);
    //       return domainUsers;
    //     }
    //   );
    // }

    getAccessToken() {
      const msft = hello('msft').getAuthResponse();
      const accessToken = msft.access_token;
      this.token.next(true);
      return accessToken;
    }

    getClient(): MicrosoftGraphClient.Client {
      var client = MicrosoftGraphClient.Client.init(
        {
          authProvider: (done) => {
            done(null, this.getAccessToken());
          }
        }
      );
      return client;
    }
  
    getMe(): Observable<MicrosoftGraph.User>
    {
      var client = this.getClient();
      return Observable.fromPromise(client
        .api('me')
        .select('displayName, mail, userPrincipalName, id')
        .get()
        .then (
          (res) => {
            this.users.setCurrentUser(res);
            return res;
          }
        )
      );
    }
  
    getPoliceUsers(): Observable<MicrosoftGraph.User[]>
    {
      var client = this.getClient();
      return Observable.fromPromise(
        client
          .api("myorganization/users?$filter=startsWith(Department, 'Police')&$top=999")
          .get()
          .then (
            (res) => {
              this.policeUsers = res.value;
              this.users.setDomainUsers(res);
              return res;
            }
          )
      );
    }

    initializeAppData() {
      this.http.get<AppUser[]>(this.serviceURL + 'FieldTraining/AppAdmin/AppAdminService.svc/fetchAppUsers')
      .subscribe(
        (appUsers: AppUser[]) => {
          this.users.setAppUsers(appUsers);
        }
      );
      
      this.http.get<any>(this.serviceURL + 'FieldTraining/DOR/lookupService.svc/fetchLookupValues')
      .subscribe(
        (lookupValues: any[]) => {
          this.dorService.populateLists(lookupValues);
          return lookupValues;
        }
      );
    }

    updateAppUser(appUser: AppUser) {
      return this.http.post(this.serviceURL + 'FieldTraining/AppAdmin/AppAdminService.svc/updateAppUser', appUser, {headers: this.headers})
        .map(
          (appUserList: AppUser[]) => {
            this.users.setAppUsers(appUserList);
            return appUserList;
          }
        );
    }

    deleteAppUser(appUser: AppUser) {
      // const deletedUser: Object[] = [
      //   'EmployeeID': appUser.EmployeeID, appUser.RoleID
      // ];
      return this.http.post(this.serviceURL + 'FieldTraining/AppAdmin/AppAdminService.svc/deleteAppUser', appUser, {headers: this.headers})
        .map(
          (appUserList: AppUser[]) => {
            this.users.setAppUsers(appUserList);
            return appUserList;
          }
        );
    }

    insertDOR(formData: FormData) {
      return this.http.post(this.serviceURL + 'FieldTraining/DOR/lookupService.svc/insertDOR', formData, {headers: this.headers})
      .subscribe(
        (currentDOR: number) => {
          this.dorFormService.updateDorNumber(currentDOR);
          return currentDOR;
        }
      );
    }

    insertFinalized(formData: FormData) {
      return this.http.post(this.serviceURL + 'FieldTraining/DOR/lookupService.svc/insertDOR', formData, {headers: this.headers})
      .map(
        (currentDOR: number) => {
          this.dorFormService.updateDorNumber(currentDOR);
          console.log('insert');
          return currentDOR;
        }
      );
    }

    getDashboardDORs(user: AppUser) {
      let dashParameters = new HttpParams();
      dashParameters = dashParameters.append('EmployeeID', user.EmployeeID);
      dashParameters = dashParameters.append('RoleID', user.RoleID.toString());
      return this.http.get<DashboardDOR[]>(this.serviceURL + 'FieldTraining/DOR/lookupService.svc/getDashboardDORs',
        {params: dashParameters})
        .map(
          (dors: DashboardDOR[]) => {
            this.dashboardService.setDashboardDORs(dors);
            console.log(dors);
            return dors;
          }
        );
    }

    getDOR(dorID: string) {
      let dorParams = new HttpParams();
      dorParams = dorParams.append('dorID', dorID);

      return this.http.get<any[]>(this.serviceURL + 'FieldTraining/DOR/lookupService.svc/getDOR',
        {params: dorParams})
        .map(
          (dor: any[]) => {
            this.dorFormService.setDOR(dor);
            return dor;
          }
        );
    }

  }

