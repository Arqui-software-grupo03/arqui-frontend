import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from '@app/topic/topic.component';
import { TopicService } from '@app/topic/topic.service';
import {PostsModule } from '@app/posts/posts.module';
import { RouterModule } from '@angular/router';
import { TopicModalComponent } from '@app/topic/topic-modal/topic-modal.component';

@NgModule({
  declarations: [
    TopicComponent,
    TopicModalComponent
  ],
  imports: [
    CommonModule,
    PostsModule,
    RouterModule,
  ],
  providers: [
    TopicService
  ],
  exports: [
    TopicComponent,
    TopicModalComponent
  ]
})
export class TopicModule { }
