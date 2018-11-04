import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopicService } from '@app/topic/topic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() topicId: string;
  @Input() topicName: string;
  postsIds;
  id;
  constructor(private topicService: TopicService, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
    await this.getPostsfromTopic();
  }
  ngOnChanges(changes: SimpleChanges) {
    /* for (let propName in changes) {
      let chng = changes[propName];
      let cur  = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    } */
  }

  async getPostsfromTopic() {
    console.log('init');
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
