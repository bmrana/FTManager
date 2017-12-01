import { SectionComponent } from './../dashboard/section/section.component';
import { DorsComponent } from './../dashboard/section/dors/dors.component';
import { DorResolverService } from './resolvers/dor-resolver.service';
import { DorGeneralFormComponent } from './../forms/dor/dor-general-form/dor-general-form.component';
import { DorCategoryFormComponent } from './../forms/dor/dor-category-form/dor-category-form.component';
import { DorComponent } from './../forms/dor/dor.component';
import { DashboardComponent } from './../dashboard/dashboard.component';
import { DeleteUserResolverService } from './resolvers/delete-user-resolver.service';
import { ErrorComponent } from './../home/error/error.component';
import { AppUserResolver } from './resolvers/appUser-resolver.service';
import { HomeComponent } from './../home/home.component';
import { UserStartComponent } from './../administration/user-admin/user-start/user-start.component';
import { UserListComponent } from './../administration/user-admin/user-list/user-list.component';
import { UserComponent } from './../administration/user-admin/user/user.component';
import { UserAdminComponent } from './../administration/user-admin/user-admin.component';
import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardDOR } from './data-models/dashboard-dor.model';
import { DashboardDORResolver } from './resolvers/dashboard-dor-resolver.service';
// import { SectionComponent } from '../dashboard/section/section.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent,  },
  { path: 'notAuthorized', component: ErrorComponent },
  { path: 'dashboard', component: DashboardComponent, resolve: {
    dashboardDORS: DashboardDORResolver
    }, children: [
      // { path: '', redirectTo: 'dors', pathMatch: 'full'},
      // { path: 'dors', component: SectionComponent },
      { path: ':section', component: SectionComponent }
    ]
  },
  { path: 'dor', component: DorComponent, children: [
    { path: '', redirectTo: '/dor/0', pathMatch: 'full'},
    { path: 'dor', resolve: {
      dor: DorResolverService
      }, component: DorGeneralFormComponent },
    { path: '0', component: DorGeneralFormComponent },
    { path: ':id', component: DorCategoryFormComponent },
  ],
  },
  { path: 'administration/users', component: UserAdminComponent,
    children: [
      { path: 'none/:type', component: UserStartComponent, outlet: 'person'},
      { path: 'post', component: UserStartComponent, outlet: 'person', resolve: {
        appUser: AppUserResolver
      }},
      { path: 'delete', component: UserStartComponent, outlet: 'person', resolve: {
        appUser: DeleteUserResolverService
      }},
      { path: 'edit/:type', component: UserComponent, outlet: 'person' },
      { path: ':type', component: UserListComponent, outlet: 'list' },
      { path: ':id/:type', component: UserComponent, outlet: 'person' }
    ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
