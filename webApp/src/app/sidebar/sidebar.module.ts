import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@app/sidebar/sidebar.component';
import { SidebarService } from './sidebar.service';

@NgModule({
  imports: [
    CommonModule
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
