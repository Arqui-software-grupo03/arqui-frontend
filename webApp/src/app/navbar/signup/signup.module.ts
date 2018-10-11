import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from '@app/navbar/signup/signup.component';
import { SignUpService } from './sign-up.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SignUpComponent,
  ],
  providers: [
    SignUpService,
  ],
  exports: [
    SignUpComponent
  ]
})
export class SignupModule { }
