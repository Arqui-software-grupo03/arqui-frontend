import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { NavbarService } from './navbar.service';
import { LogoutComponent } from './logout/logout.component';
import { RouterModule } from '@angular/router';
import { NotificationCenterComponent } from './notification-center/notification-center.component';


@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    SignupModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    LogoutComponent,
    NotificationCenterComponent,
  ],
  exports: [
    NavbarComponent,
  ],
  providers: [
    NavbarService,
  ]
})
export class NavbarModule { }
