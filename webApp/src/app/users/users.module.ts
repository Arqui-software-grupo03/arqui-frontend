import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { SignupModule } from '@app/navbar/signup/signup.module';
import { PostsModule } from '@app/posts/posts.module';

@NgModule({
  imports: [
    CommonModule,
    SignupModule,
    PostsModule
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
