import { Component, OnInit, Input } from '@angular/core';
import { TopicService } from '@app/topic/topic.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() topicId: string;
  @Input() topicName: string;
  postsIds;
  constructor(private topicService: TopicService) { }

  ngOnInit() {
    this.getPostsfromTopic();
  }

  getPostsfromTopic() {
    this.topicService.getAllPostFromTopic(this.topicId).subscribe(
      postsIds => {
        this.postsIds = postsIds;
        console.log(postsIds);
      }, error =>  console.log(error)
    );
  }




}
