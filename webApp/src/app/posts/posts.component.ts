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

  async ngOnInit() {
    await this.getPostsfromTopic();
  }

  async getPostsfromTopic() {
    await this.topicService.getAllPostsFromTopicById(+this.topicId).toPromise().then(
      postsIds => {
        this.postsIds = postsIds;
        console.log(postsIds);
      },
      error =>  console.log(error)
    ).catch(
      (err) => console.log(err)
    );
  }




}
