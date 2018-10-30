import { HomepageComponent } from '@app/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@app/navbar/login/login.module';
import { HomepageService } from '@app/homepage/homepage.service';
import { SignupModule } from '@app/navbar/signup/signup.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { PostsModule } from '@app/posts/posts.module';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
    imports: [
        CommonModule,
        LoginModule,
        SignupModule,
        FlashMessagesModule,
        PostsModule,
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
