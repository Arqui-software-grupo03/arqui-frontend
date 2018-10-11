import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
