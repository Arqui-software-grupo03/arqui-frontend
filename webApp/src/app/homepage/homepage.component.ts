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
  choice = 1;
  constructor(private homepageService: HomepageService) { }

  ngOnInit() {

  }


}
