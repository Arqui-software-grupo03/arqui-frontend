import { HomepageComponent } from '@app/homepage/homepage.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from '@app/navbar/login/login.module';
import { HomepageService } from '@app/homepage/homepage.service';


@NgModule({
    imports: [
        CommonModule,
        LoginModule
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
