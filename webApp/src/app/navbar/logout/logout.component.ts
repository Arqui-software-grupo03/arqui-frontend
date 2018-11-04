import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/users/users.service';
import { LogInService } from '@app/navbar/login/login.service';
import { PostsService } from '@app/posts/posts.service';
import { TopicService } from '@app/topic/topic.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private usersService: UsersService, private logInService: LogInService,
              private postsService: PostsService, private topicService: TopicService) { }

  ngOnInit() {
  }
  onLogout() {
    this.logout();
    this.usersService.editUser({});
  }
  logout() {
    this.logInService.removeToken();
    this.logInService.editLogged(false);
    this.postsService.updateCastTopicPosts([]);
    this.topicService.updateArrayCastTopics([]);
  }
}
