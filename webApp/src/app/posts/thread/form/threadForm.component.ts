import { Component, OnInit, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ThreadService } from '../thread.service';
import { UsersService } from '@app/users/users.service';
import { TopicService } from '@app/topic/topic.service';
import { PostsService } from '@app/posts/posts.service';

@Component({
  selector: 'app-thread-form',
  templateUrl: './threadForm.component.html',
  styleUrls: ['./threadForm.component.scss']
})
export class ThreadFormComponent implements OnInit, OnChanges {
  userPhotoUrl;
  threadText = '';
  user: any;
  @Input() threadCounter: number;
  @Input() post: any;
  @Input() showThread;
  @Output() show = new EventEmitter();
  @Output() newAnswer = new EventEmitter();

  constructor(private threadService: ThreadService, private usersService: UsersService, private topicService: TopicService,
              private postsService: PostsService) {
  }

  ngOnInit() {
    this.usersService.castUser.subscribe(
      usr => this.user = usr
    );
  }
  ngOnChanges(changes: SimpleChanges) {
  }

  onClickShowComments(event) {
    event.preventDefault();
    this.showThread = !this.showThread;
    this.show.emit(this.showThread);
  }

  keyUp(value: string) {
    this.threadText = value;
  }

  keyPressed($event) {
    if (($event.keyCode === 13) && this.threadText.length > 0) {
      this.createAnswer();
    }
  }

  async createAnswer() {
    await this.threadService.createAnswer(this.post.post_id, this.user.id, this.threadText).toPromise().then(
      ans => {
        this.newAnswer.emit(ans);
        this.threadText = '';
      }
    ).catch(err => console.log(err));
    this.threadText = '';
  }
}
