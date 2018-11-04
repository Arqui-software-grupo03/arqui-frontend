import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@app/sidebar/sidebar.component';
import { SidebarService } from './sidebar.service';
import { RouterModule } from '@angular/router';
import { TopicModule } from '@app/topic/topic.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TopicModule
  ],
  declarations: [
    SidebarComponent,
  ],
  exports: [
    SidebarComponent,
  ],
  providers: [
    SidebarService
  ]
})
export class SidebarModule { }
