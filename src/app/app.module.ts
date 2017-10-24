import { AppRoutingModule } from './core/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DomainUsersResolver } from './core/resolvers/domainUsers-resolver.service';
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
    UserListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ WebConnectServiceService,
              UsersService,
              DomainUsersResolver ],
  bootstrap: [AppComponent]
})
export class AppModule { }
