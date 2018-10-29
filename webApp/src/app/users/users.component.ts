import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.castUser.subscribe(
      usr => this.user = usr
    );
    setTimeout(
      () => this.getData(), 50
    );
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

}
