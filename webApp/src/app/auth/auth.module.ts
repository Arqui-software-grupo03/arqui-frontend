import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '@app/auth/auth.component';
import { AuthService } from '@app/auth/auth.service';
import { AuthResolver } from '@app/auth/auth.resolver';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    AuthService,
    AuthResolver
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
