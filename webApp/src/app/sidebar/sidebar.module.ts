import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@app/sidebar/sidebar.component';
import { SidebarService } from './sidebar.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
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
