import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from '@app/navbar/login/login.component';
import { LogInService } from '@app/navbar/login/login.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  imports: [
    CommonModule,
    FlashMessagesModule
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
