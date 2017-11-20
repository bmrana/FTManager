import { DashboardService } from './../services/dashboard.service';
import { DashboardDOR } from './../data-models/dashboard-dor.model';
import { DorFormDataService } from './../../forms/dor/data/dor-form-data.service';
import { DorService } from './../services/dor.service';
import { AppUser } from './../data-models/app-user.model';
import { UsersService } from './../services/users.service';
import { DomainUser } from './../data-models/domain-user.model';
import { Injectable } from '@angular/core';
import { HttpClient,
          HttpParams,
          HttpRequest,
          HttpErrorResponse,
          HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { FormData } from '../../forms/dor/data/dor-form-data.model';

@Injectable()
export class WebConnectServiceService {
  headers = new HttpHeaders({ 'Content-Type' : 'application/json' });
  serviceURL = 'http://localhost:62675/';

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

    initializeAppData() {
      this.http.get<DomainUser>(this.serviceURL + 'ADService.svc/getCurrentUser')
      .subscribe(
        (currentUser) => {
          this.users.setCurrentUser(currentUser);
        }
      );
      this.http.get<AppUser[]>(this.serviceURL + 'AppAdminService.svc/fetchAppUsers')
      .subscribe(
        (appUsers: AppUser[]) => {
          this.users.setAppUsers(appUsers);
        }
      );
      this.http.get<DomainUser[]>(this.serviceURL + 'ADService.svc/getUsers')
      .subscribe(
        (domainUsers) => {
          this.users.setDomainUsers(domainUsers);
          return domainUsers;
        }
      );
      this.http.get<any>(this.serviceURL + 'DOR/lookupService.svc/fetchLookupValues')
      .subscribe(
        (lookupValues: any[]) => {
          this.dorService.populateLists(lookupValues);
          return lookupValues;
        }
      );
    }

    updateAppUser(appUser: AppUser) {
      return this.http.post(this.serviceURL + 'AppAdminService.svc/updateAppUser', appUser, {headers: this.headers})
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
      return this.http.post(this.serviceURL + 'AppAdminService.svc/deleteAppUser', appUser, {headers: this.headers})
        .map(
          (appUserList: AppUser[]) => {
            this.users.setAppUsers(appUserList);
            return appUserList;
          }
        );
    }

    insertDOR(formData: FormData) {
      return this.http.post(this.serviceURL + 'DOR/lookupService.svc/insertDOR', formData, {headers: this.headers})
      .subscribe(
        (currentDOR: number) => {
          this.dorFormService.updateDorNumber(currentDOR);
          return currentDOR;
        }
      );
    }

    getDashboardDORs(user: AppUser) {
      let dashParameters = new HttpParams();
      dashParameters = dashParameters.append('EmployeeID', user.EmployeeID);
      dashParameters = dashParameters.append('RoleID', user.RoleID.toString());

      return this.http.get<DashboardDOR[]>(this.serviceURL + 'DOR/lookupService.svc/getDashboardDORs',
        {params: dashParameters})
        .map(
          (dors: DashboardDOR[]) => {
            this.dashboardService.setDashboardDORs(dors);
            return dors;
          }
        );
    }

  }

