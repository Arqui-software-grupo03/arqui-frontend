import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '@app/posts/posts.service';

declare var jQuery: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentUser;
  user;
  postsArray;
  constructor(private usersService: UsersService, private route: ActivatedRoute,
              private routerNav: Router, private postsService: PostsService) {
    this.route.data.subscribe(
      res => {
        if (res.user) {
          this.user = res.user;
          // console.log(this.user);
        } else {
          if (this.route.snapshot.params['userId']) {
            this.routerNav.navigate(['home']);
          }
        }
    },
    error => {
    });
  }

  async ngOnInit() {
    this.usersService.castUser.subscribe(
      usr => {
        this.currentUser = usr;
        if (!this.route.snapshot.params['userId']) {
          this.user = usr;
        }
        if (+this.route.snapshot.params['userId'] === this.currentUser.id) {
          this.routerNav.navigate(['profile']);
        }
      }
    );
    setTimeout(
      () => this.getData(), 50
    );
    await this.getUserPosts();
    this.addjQueryTooltip();
  }

  getData() {
    this.user.followers = 10;
    this.user.following = 20;
    this.user.url = 'https://s17.postimg.cc/xcbukrwdr/Hugh_Jackman_f.jpg';
    this.user.username = 'Name';
  }

  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }

  async getUserPosts() {
    const posts = await this.postsService.getAllPosts().toPromise().then().catch((err) => console.log(err));
    if (posts) {
      this.postsArray = posts.filter(post => post.user_id === this.user.id);
    } else {
      this.postsArray = [];
    }
  }
}
