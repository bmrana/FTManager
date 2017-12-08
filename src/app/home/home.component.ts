import { AuthService } from './../core/services/auth.service';
import { DashboardDOR } from './../core/data-models/dashboard-dor.model';
import { DashboardService } from './../core/services/dashboard.service';
import { DorService } from './../core/services/dor.service';
import { AuthorizationService } from './../core/services/authorization.service';
import { DomainUser } from './../core/data-models/domain-user.model';
import { UsersService } from './../core/services/users.service';
import { WebConnectServiceService } from './../core/web-services/web-connect-service.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('openInitModal') openInitModal: ElementRef;
  currentUserSubscription: Subscription;
  appUsersSubscription: Subscription;
  domainUsersSubscription: Subscription;
  lookupsSubscription: Subscription;
  meSubscription: Subscription;

  meName: MicrosoftGraph.User;
  currentUserLoaded = false;
  appUsersLoaded = false;
  domainUsersLoaded = false;
  lookupsLoaded = false;

  showProgress: boolean;
  authLevel: number;
  currentUser: DomainUser;

  constructor(private httpService: WebConnectServiceService,
    private users: UsersService,
    private dorService: DorService,
    private dashboardService: DashboardService,
    private auth: AuthorizationService,
    private auth0: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.httpService.initializeAppData();
    this.openInitModal.nativeElement.click();

    this.meSubscription = this.httpService.getMe()
    .subscribe(
      (currentUser: MicrosoftGraph.User) => {
        this.meName = currentUser;
      }
    );

    this.domainUsersSubscription = this.httpService.getPoliceUsers()
      .subscribe(
      (domainUsers) => {
        this.domainUsersLoaded = true;
        this.checkNavigate();
      }
      );
    this.appUsersSubscription = this.users.appUsersChanged
      .subscribe(
      (appUsers) => {
        this.appUsersLoaded = true;
        this.checkNavigate();
      }
      );
    this.lookupsSubscription = this.dorService.lookupsRetrieved
      .subscribe(
      (retrieved) => {
        if (retrieved) {
          this.lookupsLoaded = true;
        }
        this.checkNavigate();
      }
      );
    this.currentUserSubscription = this.auth.authorization
      .subscribe(
      (authLevel: number) => {
        this.authLevel = authLevel;
        this.currentUserLoaded = true;
        this.checkNavigate();
      }
      );
    
    // // this.router.navigate(['dashboard']);
  }

  checkNavigate() {
    if (this.currentUserLoaded === true &&
        this.appUsersLoaded === true &&
        this.domainUsersLoaded === true
        && this.lookupsLoaded === true) {
      if (this.authLevel === 0) {
        this.openInitModal.nativeElement.click();
        this.router.navigate(['notAuthorized']);
      } else {
        this.openInitModal.nativeElement.click();
        // this.router.navigate(['dashboard']);
        this.auth0.loginFinished.next(true);
      }
    }
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
    this.appUsersSubscription.unsubscribe();
    this.domainUsersSubscription.unsubscribe();
    this.lookupsSubscription.unsubscribe();
    this.meSubscription.unsubscribe();
  }

}
