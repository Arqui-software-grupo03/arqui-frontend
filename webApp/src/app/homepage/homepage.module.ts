import { HomepageComponent } from '@app/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@app/navbar/login/login.module';
import { HomepageService } from '@app/homepage/homepage.service';
import { SignupModule } from '@app/navbar/signup/signup.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { NavbarModule } from '@app/navbar/navbar.module';
import { PostsModule } from '@app/posts/posts.module';
import { SidebarModule } from '@app/sidebar/sidebar.module';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
    imports: [
        CommonModule,
        LoginModule,
        SignupModule,
        FlashMessagesModule,
        NavbarModule,
        PostsModule,
        SidebarModule,
        NgxLoadingModule
    ],
    declarations: [
        HomepageComponent
    ],
    exports: [
        HomepageComponent,
    ],
    providers: [
        HomepageService
    ]
})
export class HomepageModule { }
