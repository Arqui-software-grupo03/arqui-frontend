import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '@app/users/users.service';
import { TopicService } from '@app/topic/topic.service';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

declare var jQuery: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  userPhotoUrl;
  user;
  topics;
  sock: Subscription;
  sockData: any;
  constructor(private usersService: UsersService, private topicService: TopicService) {
    this.userPhotoUrl = '../../assets/felipe_de_la_fuente.jpg';
   }

  ngOnInit() {
    this.sock = this.topicService.getFromSocket().subscribe(
      d => this.sockData = d
    );
    this.usersService.castUser.subscribe(
      user => {
        this.user = user;
        // console.log(this.user);
      }, error => console.log(error)
    );
    this.topicService.castTopics.subscribe(
      t => this.topics = t
    );
    this.getAllTopics();
  }

  ngOnDestroy() {
    this.sock.unsubscribe();
  }

  onClickEditProfile(event) {

  }
  getAllTopics() {
    this.topicService.getAllTopics().subscribe(
      topics => {
        topics.map(
          t => {
            this.topicService.addTopicToCastTopics(t);
          }
        );
        // console.log(this.topics);
      }, error => {
        console.log(error);
      }
    );
  }

  openModal() {
    jQuery('.topicM').modal('show');
  }

}
