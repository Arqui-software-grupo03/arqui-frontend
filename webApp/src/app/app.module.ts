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
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from '@app/app.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { HomepageModule } from './homepage/homepage.module';
import { NgxLoadingModule } from 'ngx-loading';
import { AppService } from './app.component.service';
import { TopicModule } from '@app/topic/topic.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { FireBaseLocalService } from './firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
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
    BrowserAnimationsModule,
    FlashMessagesModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    AppRoutingModule,
    HomepageModule,
    TopicModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ],
  providers: [
    AppService,
    FireBaseLocalService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
