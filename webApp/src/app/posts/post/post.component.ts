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
  post;
  answers;
  @Input() topicName: string;
  constructor(private postsService: PostsService) {
    this.userPhotoUrl = '../../assets/felipe_de_la_fuente.jpg';
    this.topic = 'Topic 1';
    this.sender = 'Felipe De la Fuente';
    this.hour = '17:32';
    this.date = '7 septiembre';
    this.showThread = false;
    this.threadCounter = 1;
    this.message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
                    + "dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen"
                    + "book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially"
                    + "unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
                    + "recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  }
  @Input() postId: string;
  ngOnInit() {
    this.getPostInfo();
  }
  onShow(event) {
    console.log(event);
    this.showThread = event;
  }
  getPostInfo() {
    this.postsService.getPost(this.postId).subscribe(
      post => this.post = post,
      error => console.log(error)
    );
  }
  getThreadCounter(threadCounter) {
    this.threadCounter = threadCounter;
  }
}
