import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ThreadService } from '@app/posts/thread/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit, OnChanges {

  userPhotoUrl;
  topic;
  response;
  hour;
  date;
  message;
  threadcount;
  @Input() post: any;
  @Output() threadCounter = new EventEmitter<number>();
  @Input() showThread: any;
  @Input() answers: any;
  constructor(private threadService: ThreadService) {
    this.userPhotoUrl = '../../assets/chau.jpg';
    this.topic = 'Topic 1';
    this.response = 'Stephanie Chau';
    this.hour = '17:38';
    this.date = '7 septiembre';

  }
  async ngOnInit() {
    // await this.getAnswers();
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  /* getAnswers() {
    this.threadService.getAllAnswers(this.post.id).toPromise().then(
      answers => {
        this.answers = answers;
        this.threadcount = this.answers.length;
        this.threadCounter.emit(this.threadcount);
        // console.log(this.answers);
      }
    ).catch(err => console.log(err));
  } */

}
