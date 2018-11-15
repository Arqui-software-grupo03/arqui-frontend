import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { ThreadService } from '@app/posts/thread/thread.service';
import { UsersService } from '@app/users/users.service';
import { AppService } from '@app/app.component.service';

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
  monthNames;
  daysOfTheWeek;
  @Input() post: any;
  @Output() threadCounter = new EventEmitter<number>();
  @Input() showThread: any;
  @Input() answers: any;
  constructor(private threadService: ThreadService, private usersService: UsersService, private appService: AppService) {
    this.monthNames = this.appService.monthNames;
    this.userPhotoUrl = '../../assets/chau.jpg';
  }
  async ngOnInit() {
    await this.getAnswersInfo();
  }

  ngOnChanges(changes: SimpleChanges) {

  }
  getAnswersInfo() {
    this.answers.map(
      async answer => {
        answer['user'] = await this.getSenderInfo(answer.user_id);
        const d = new Date(answer.pub_date);
        answer['date'] = `${d.getDate()} ${this.monthNames[d.getMonth()]}`;
        answer['hour'] = `${d.getHours()}:${d.getMinutes()}`;
      }
    );
  }
  async getSenderInfo(userId: number) {
    const user = await this.usersService.getUserById(userId).toPromise().then().catch(err => console.log(err));
    return user;
  }

}
