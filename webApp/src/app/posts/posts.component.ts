import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TopicService } from '@app/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() topicId: string;
  @Input() topicName: string;
  postsArray;
  id;
  constructor(private topicService: TopicService, private activatedRoute: ActivatedRoute,
              private postsService: PostsService) { }

  async ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.postsService.castTopicPosts.subscribe(
      p => this.postsArray = p
    );
    await this.getPostsfromTopic();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.postsService.updateCastTopicPosts([]);
    this.getPostsfromTopic();
  }

  async getPostsfromTopic() {
    await this.topicService.getAllPostsFromTopicById(+this.topicId).toPromise().then(
      posts => {
        this.postsService.updateCastTopicPosts(posts);
      },
      error =>  console.log(error)
    ).catch(
      (err) => console.log(err)
    );
  }




}
