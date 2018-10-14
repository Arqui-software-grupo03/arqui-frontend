import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
