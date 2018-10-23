import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AdminModule } from '@app/admin/admin.module';
import { NavbarModule } from '@app/navbar/navbar.module';
import { PostsModule } from '@app/posts/posts.module';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    NavbarModule,
    PostsModule,
    SidebarModule,
    UsersModule,
    AuthModule,
    InfiniteScrollModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FlashMessagesModule.forRoot(),
    ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
