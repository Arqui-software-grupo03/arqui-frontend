import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { SignupModule } from '@app/navbar/signup/signup.module';
import { NavbarModule } from '@app/navbar/navbar.module';
// import { usersRouting } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    SignupModule,
    NavbarModule,
    // usersRouting
  ],
  declarations: [
    UsersComponent,
  ],
  exports: [
    UsersComponent
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
