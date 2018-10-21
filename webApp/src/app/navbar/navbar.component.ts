import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { UsersService } from '@app/users/users.service';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  user;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.castUser.subscribe(
      user => this.user = user
    );
    this.addjQueryTooltip();
    this.addjQuerySideBarToggle();

  }
  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }
  addjQuerySideBarToggle() {
    jQuery('#sidebarCollapse').on('click', () => {
      jQuery('#sidebar').toggleClass('active');
      jQuery('#rightBox').toggleClass('active');
    });
  }
}
