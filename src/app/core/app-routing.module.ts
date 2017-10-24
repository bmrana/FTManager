import { DomainUsersResolver } from './resolvers/domainUsers-resolver.service';
import { HomeComponent } from './../home/home.component';
import { UserStartComponent } from './../administration/user-admin/user-start/user-start.component';
import { UserListComponent } from './../administration/user-admin/user-list/user-list.component';
import { UserComponent } from './../administration/user-admin/user/user.component';
import { UserAdminComponent } from './../administration/user-admin/user-admin.component';
import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'manager', component: HomeComponent, resolve: {
    domainUsers: DomainUsersResolver
  } },
  { path: 'administration/users', component: UserAdminComponent,
    children: [
      { path: 'none', component: UserStartComponent, outlet: 'person'},
      { path: 'edit', component: UserComponent, outlet: 'person' },
      { path: ':type', component: UserListComponent, outlet: 'list' },
      { path: ':id', component: UserComponent, outlet: 'person' }
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
