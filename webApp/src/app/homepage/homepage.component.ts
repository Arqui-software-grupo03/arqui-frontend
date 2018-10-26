import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';
import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  clickedLogInBtn;
  clickedSignUpBtn;
  constructor(private homepageService: HomepageService) { }

  ngOnInit() {
    this.homepageService.castLogInHome.subscribe(
      val => this.clickedLogInBtn = val
    );
    this.homepageService.castSignUpHome.subscribe(
      val => this.clickedSignUpBtn = val
    );
    this.addjQueryTooltip();
  }

  addjQueryTooltip() {
    jQuery('#login').on('click', () => {
      this.homepageService.editVariables('login', !this.clickedLogInBtn);
    });
    jQuery('#signup').on('click', () => {
      this.homepageService.editVariables('signup', !this.clickedSignUpBtn);
    });

  }

}
