import { UsersService } from './../services/users.service';
import { DomainUser } from './../data-models/domain-user.model';
import { Injectable } from '@angular/core';
import { HttpClient,
          HttpParams,
          HttpRequest,
          HttpErrorResponse,
          HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WebConnectServiceService {
  headers = new HttpHeaders({ 'Content-Type' : 'application/json' });

  constructor(private http: HttpClient, private users: UsersService) {}

    fetchAllUsers() {
      return this.http.get<DomainUser[]>('http://localhost:62675/ADService.svc/getUsers')
      .map(
        (domainUsers) => {
          this.users.setDomainUsers(domainUsers);
          return domainUsers;
        }
      );
    }

    getCurrentUser() {
      return this.http.get<DomainUser>('http://localhost:62675/ADService.svc/getCurrentUser')
      // .map(
      //   (currentUser) => {
      //     this.users.setCurrentUser(currentUser);
      //     return currentUser;
      //   }
      // );
      .subscribe(
        (currentUser) => {
          this.users.setCurrentUser(currentUser);
        }
      );
    }
  }

