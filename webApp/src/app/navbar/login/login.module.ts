import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from '@app/navbar/login/login.component';
import { LogInService } from '@app/navbar/login/login.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LogInComponent
  ],
  providers: [
    LogInService
  ],
  exports: [
    LogInComponent,
  ]
})
export class LoginModule { }
