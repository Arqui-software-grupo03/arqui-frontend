import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { NavbarService } from './navbar.service';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { LogoutComponent } from './logout/logout.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HomepageModule } from '@app/homepage/homepage.module';


@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    SignupModule,
    SidebarModule,
    FlashMessagesModule,
    HomepageModule
  ],
  declarations: [
    NavbarComponent,
    LogoutComponent,
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    NavbarService,
  ]
})
export class NavbarModule { }
