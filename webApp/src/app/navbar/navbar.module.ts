import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { NavbarService } from './navbar.service';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    SignupModule,
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
