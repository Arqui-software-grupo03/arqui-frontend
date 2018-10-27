import { HomepageComponent } from '@app/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@app/navbar/login/login.module';
import { HomepageService } from '@app/homepage/homepage.service';
import { SignupModule } from '@app/navbar/signup/signup.module';


@NgModule({
    imports: [
        CommonModule,
        LoginModule,
        SignupModule
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
