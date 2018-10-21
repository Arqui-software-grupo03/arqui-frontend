import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadComponent } from '@app/posts/thread/thread.component';
import { ThreadService } from './thread.service';
import { ThreadFormComponent } from './form/threadForm.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ThreadComponent,
  ],
  providers: [
    ThreadService
  ],
  exports: [
    ThreadComponent
  ]
})
export class ThreadModule { }
