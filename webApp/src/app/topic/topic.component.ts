import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topicName = 'General';
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.topicName = this.activatedRoute.snapshot.paramMap.get('topicName');
  }

}
