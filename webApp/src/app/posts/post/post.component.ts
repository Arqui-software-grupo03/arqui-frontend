import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '@app/posts/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  userPhotoUrl;
  topic;
  sender;
  hour;
  date;
  message;
  showThread;
  threadCounter;
  post = {};
  answers;
  @Input() topicName: string;
  @Input() postId;
  constructor(private postsService: PostsService) {
    this.userPhotoUrl = '../../assets/felipe_de_la_fuente.jpg';
    this.topic = 'Topic 1';
    this.sender = 'Felipe De la Fuente';
    this.hour = '17:32';
    this.date = '7 septiembre';
    this.showThread = false;
    this.threadCounter = 1;
    this.message = 'LoremIpsum';
  }
  async ngOnInit() {
    await this.getPostInfo();
  }
  onShow(event) {
    // console.log(event);
    this.showThread = event;
  }
  async getPostInfo() {
    await this.postsService.getPost(this.postId.id).toPromise().then(
      post => {
        this.post = post;
      },
      error => console.log(error)
    ).catch(
      (err) => {
        console.log(`Post ${err}`);
      }
    );
  }
  getThreadCounter(threadCounter) {
    this.threadCounter = threadCounter;
  }
}
