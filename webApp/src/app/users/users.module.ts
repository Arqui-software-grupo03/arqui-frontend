import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { SignupModule } from '@app/navbar/signup/signup.module';
import { FileUploadModule } from 'ng2-file-upload';
// import { usersRouting } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    SignupModule,
    FileUploadModule,
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
