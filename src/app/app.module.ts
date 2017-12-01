import { DorFormDataService } from './forms/dor/data/dor-form-data.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';
import { DorService } from './core/services/dor.service';
import { DeleteUserResolverService } from './core/resolvers/delete-user-resolver.service';
import { AuthorizationService } from './core/services/authorization.service';
import { AppUserResolver } from './core/resolvers/appUser-resolver.service';
import { AppRoutingModule } from './core/app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersService } from './core/services/users.service';
import { WebConnectServiceService } from './core/web-services/web-connect-service.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { UserComponent } from './administration/user-admin/user/user.component';
import { UserHeaderComponent } from './administration/user-admin/user-header/user-header.component';
import { UserListComponent } from './administration/user-admin/user-list/user-list.component';
import { UserAdminComponent } from './administration/user-admin/user-admin.component';
import { UserStartComponent } from './administration/user-admin/user-start/user-start.component';
import { HomeComponent } from './home/home.component';
import { UserListItemComponent } from './administration/user-admin/user-list/user-list-item/user-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListFilterPipe } from './core/pipes/user-list-filter.pipe';
import { ErrorComponent } from './home/error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashHeaderComponent } from './dashboard/dash-header/dash-header.component';
import { DorComponent } from './forms/dor/dor.component';
import { DorNavComponent } from './forms/dor/dor-nav/dor-nav.component';
import { DorNavItemComponent } from './forms/dor/dor-nav/dor-nav-item/dor-nav-item.component';
import { DorCategoryFilterPipe } from './core/pipes/dor-category-filter.pipe';
import { CommentItemComponent } from './forms/dor/comment-item/comment-item.component';
import { DorCategoryFormComponent } from './forms/dor/dor-category-form/dor-category-form.component';
import { DorGeneralFormComponent } from './forms/dor/dor-general-form/dor-general-form.component';
import { FormStatusComponent } from './forms/dor/form-status/form-status.component';
import { PendingDorComponent } from './dashboard/fto/pending-dor/pending-dor.component';
import { UnreviewedDorComponent } from './dashboard/fto/unreviewed-dor/unreviewed-dor.component';
import { RecentDorComponent } from './dashboard/fto/recent-dor/recent-dor.component';
import { DashboardService } from './core/services/dashboard.service';
import { DashboardDORResolver } from './core/resolvers/dashboard-dor-resolver.service';
import { DashboardDorItemComponent } from './dashboard/dashboard-dor-item/dashboard-dor-item.component';
import { DorResolverService } from './core/resolvers/dor-resolver.service';
import { DorsComponent } from './dashboard/section/dors/dors.component';
import { SectionComponent } from './dashboard/section/section.component';
import { EoprsComponent } from './dashboard/section/eoprs/eoprs.component';
import { DrjsComponent } from './dashboard/section/drjs/drjs.component';
import { AuthService } from './core/services/auth.service';
import { DerpPipe } from './core/pipes/derp.pipe';
import { ZoneComponent } from './home/zone/zone.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    UserHeaderComponent,
    UserListComponent,
    UserAdminComponent,
    UserStartComponent,
    HomeComponent,
    UserListItemComponent,
    UserListFilterPipe,
    ErrorComponent,
    DashboardComponent,
    DashHeaderComponent,
    DorComponent,
    DorNavComponent,
    DorNavItemComponent,
    DorCategoryFilterPipe,
    CommentItemComponent,
    DorCategoryFormComponent,
    DorGeneralFormComponent,
    FormStatusComponent,
    PendingDorComponent,
    UnreviewedDorComponent,
    RecentDorComponent,
    DashboardDorItemComponent,
    DorsComponent,
    SectionComponent,
    EoprsComponent,
    DrjsComponent,
    DerpPipe,
    ZoneComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule
  ],
  providers: [ WebConnectServiceService,
              UsersService,
              DorService,
              DorFormDataService,
              AppUserResolver,
              AuthorizationService,
              DeleteUserResolverService,
              DorCategoryFormComponent,
              DashboardService,
              DashboardDORResolver,
              DorResolverService,
              SectionComponent,
              AuthService
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
