import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { TopicService } from '@app/topic/topic.service';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from './posts.service';
import { UsersService } from '@app/users/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
declare var jQuery: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() topicId: string;
  @Input() topicName: string;
  postsArray;
  id;
  user;
  isUserSubscribed: boolean;
  constructor(private topicService: TopicService, private activatedRoute: ActivatedRoute,
              private postsService: PostsService, private usersService: UsersService,
              private flashMessage: FlashMessagesService) { }

  async ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.usersService.castUser.subscribe(user => this.user = user);
    this.postsService.castTopicPosts.subscribe(
      posts => this.postsArray = posts
    );
    // console.log(this.user);
    this.addjQueryTooltip();
    await this.getTopicSubscribers();
    await this.getPostsfromTopic();
  }
  async ngOnChanges(changes: SimpleChanges) {
    this.postsService.updateCastTopicPosts([]);
    await this.getTopicSubscribers();
    await this.getPostsfromTopic();
  }

  ngOnDestroy() {
    this.postsService.updateCastTopicPosts([]);
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

  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }

  followTopic() {
    this.topicService.subscribeUserToTopic(+this.topicId, +this.user.id).subscribe(
      status => {
        this.isUserSubscribed = !this.isUserSubscribed;
      },
      error => {
        this.showMessage('Error al intentar seguir el topic. Intente nuevamente.', 'danger');
        console.log(error);
      }
    );
  }

  unFollowTopic() {
    this.topicService.unsubscribeUserToTopic(+this.topicId, this.user.id).subscribe(
      msg => {
        this.isUserSubscribed = false;
      },
      status => {
        if (status === 200) {
          this.isUserSubscribed = false;
        } else {
          this.showMessage('Error al intentar dejar de seguir el topic. Intente nuevamente.', 'danger');
          console.log(status);
        }
      }
    );
  }

  async getTopicSubscribers() {
    let subscribers: any;
    subscribers = await this.topicService.getAllSubscribersFromTopic(this.topicId).toPromise().then().catch(err => console.log(err));
    if (subscribers) {
      this.isUserSubscribed = subscribers.filter(subs => subs.user_id === this.user.id).length > 0 ? true : false;
    } else {
      this.isUserSubscribed = false;
    }
  }

  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: 5000,
      showCloseBtn: true,
      closeOnClick: true
    });
  }
}
