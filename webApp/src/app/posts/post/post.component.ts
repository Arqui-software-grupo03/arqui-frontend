import { Component, OnInit, Input, Output } from '@angular/core';
import { PostsService } from '@app/posts/posts.service';
import { UsersService } from '@app/users/users.service';
import { AppService } from '@app/app.component.service';
import { EventEmitter } from '@angular/core';
import { ThreadService } from '../thread/thread.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  loading = true;
  userPhotoUrl;
  topic;
  sender;
  hour;
  date;
  showThread;
  threadCounter;
  answers;
  daysOfTheWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun',
    'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'];
  @Input() topicName: string;
  @Input() post: any;
  constructor(private postsService: PostsService, private usersService: UsersService,
            private appService: AppService, private threadService: ThreadService) {
    this.userPhotoUrl = '../../assets/felipe_de_la_fuente.jpg';
    this.showThread = false;
    this.threadCounter = 0;
  }
  async ngOnInit() {
    if (this.post.id) {
      this.post.post_id = this.post.id;
    }
    await this.getPostInfo();
  }
  onShow(event) {
    this.showThread = event;
  }
  async getPostInfo() {
    const post = await this.postsService.getPost(this.post.post_id).toPromise().then()
      .catch(
        (err) => {
          console.log(`Post ${err}`);
        });
    if (post) {
      const user = await this.usersService.getUserById(post.user_id).toPromise().then().catch(err => console.log(err));
      await this.getAnswers();
      if (user) {
        this.sender = user;
        const d = new Date(post.pub_date);
        this.date = `${d.getDate()} ${this.monthNames[d.getMonth()]}`;
        this.hour = `${d.getHours()}:${d.getMinutes()}`;
        this.post = post;
        // console.log(this.daysOfTheWeek[date.getDay()], date.getDate(), date.getMonth() + 1, date.getUTCFullYear());
      }
    }
    this.loading = false;
  }

  getThreadCounter(threadCounter) {
    this.threadCounter = threadCounter;
  }

  emitNewAnswer(newA) {
    this.answers.push(newA);
    this.threadCounter = this.answers.length;
    this.showThread = true;
  }

  getAnswers() {
    this.threadService.getAllAnswers(this.post.post_id).toPromise().then(
      answers => {
        this.answers = answers;
        this.threadCounter = this.answers.length;
      }
    ).catch(err => console.log(err));
  }
}
