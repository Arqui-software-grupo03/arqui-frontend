import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '@app/posts/posts.service';
import { UsersService } from '@app/users/users.service';
import { AppService } from '@app/app.component.service';

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
  message;
  showThread;
  threadCounter;
  answers;
  daysOfTheWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun',
    'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'];
  @Input() topicName: string;
  @Input() post: any;
  constructor(private postsService: PostsService, private usersService: UsersService,
            private appService: AppService) {
    this.userPhotoUrl = '../../assets/felipe_de_la_fuente.jpg';
    // this.topic = 'Topic 1';
    // this.sender = 'Felipe De la Fuente';
    // this.hour = '17:32';
    // this.date = '7 septiembre';
    this.showThread = false;
    this.threadCounter = 1;
    this.message = 'LoremIpsum';
  }
  async ngOnInit() {
    await this.getPostInfo();
  }
  onShow(event) {
    // console.log(event);
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
  getUser() {

  }
  getThreadCounter(threadCounter) {
    this.threadCounter = threadCounter;
  }
}
