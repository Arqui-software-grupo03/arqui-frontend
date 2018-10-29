import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '@app/auth/auth.component';
import { AuthService } from '@app/auth/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    AuthService,
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
