import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TopicService } from '@app/topic/topic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topicId = '0';
  topic;
  constructor(private activatedRoute: ActivatedRoute, private topicService: TopicService) { }

  ngOnInit() {
    this.topicId = this.activatedRoute.snapshot.paramMap.get('topicId');
    this.getTopic();
  }
  getTopic() {
    this.topicService.getTopic(this.topicId).subscribe(
      topic => this.topic = topic
      , error => console.log(error)
    );
  }

}
