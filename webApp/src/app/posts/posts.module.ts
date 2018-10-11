import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '@app/posts/posts.component';
import { FormModule } from '@app/posts/form/form.module';
import { ThreadModule} from '@app/posts/thread/thread.module';
import { PostsService } from './posts.service';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    ThreadModule
  ],
  declarations: [
    PostsComponent,
  ],
  exports: [
    PostsComponent,
  ],
  providers: [
    PostsService
  ]
})
export class PostsModule { }
