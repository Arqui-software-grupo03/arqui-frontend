import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ThreadService } from '@app/posts/thread/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit {

  userPhotoUrl;
  topic;
  response;
  hour;
  date;
  message;
  answers;
  threadcount;
  @Input() postId: string;
  @Output() threadCounter = new EventEmitter<number>();
  constructor(private threadService: ThreadService) {
    this.userPhotoUrl = '../../assets/chau.jpg';
    this.topic = 'Topic 1';
    this.response = 'Stephanie Chau';
    this.hour = '17:38';
    this.date = '7 septiembre';
    this.message = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
                    + "dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen"
                    + "book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially"
                    + "unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more"
                    + "recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  }
  ngOnInit() {
    this.getAnswers();
  }
  getAnswers() {
    this.threadService.getAllAnswers(this.postId).subscribe(
      answers => {
        this.answers = answers;
        this.threadcount = this.answers.length;
        this.threadCounter.emit(this.threadcount);
        console.log(this.answers);
      }, error => console.log(error)
    );
  }

}
