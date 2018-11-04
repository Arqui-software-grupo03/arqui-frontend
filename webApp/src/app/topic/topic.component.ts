import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { TopicService } from '@app/topic/topic.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {
  topicId: number;
  topic = {};
  constructor(private activatedRoute: ActivatedRoute, private topicService: TopicService,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.topicId = +this.activatedRoute.snapshot.paramMap.get('topicId');
    this.getTopic();
  }
  getTopic() {
    this.topicService.getTopicById(this.topicId).subscribe(
      topic => {
        this.topic = topic;
        // this.showMessage('great!', 'success');
      },
      error => {
        console.log(error);
        // this.showMessage(error, 'danger');
      }
    );
  }

  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: 5000,
      showCloseBtn: true,
      closeOnClick: true
    });
  }

}
