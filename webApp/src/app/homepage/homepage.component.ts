import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HomepageService } from './homepage.service';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { UsersService } from '@app/users/users.service';
import { takeUntil } from 'rxjs/operators';
import { LogInService } from '@app/navbar/login/login.service';
import { AppService } from '@app/app.component.service';
import { TopicService } from '@app/topic/topic.service';

const TIMEOUT = 5000;
declare var jQuery: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  choice = 1;
  user;
  private ngUnsubscribe = new Subject();
  public loading = true;
  constructor(private logInService: LogInService, private flashMessage: FlashMessagesService,
    private usersService: UsersService, private cdRef: ChangeDetectorRef,
    private appService: AppService, private topicService: TopicService,
    private router: Router) {


  }

  ngOnInit() {
    this.appService.castLoading.subscribe(
      val => {
        this.loading = val;
      }
    );
    this.topicService.castTopics.subscribe(
      t => {
        if (t.length > 0) {
          this.router.navigate([`/topic/${t[0].topic_id}`]);
        }
      }
    );
    this.usersService.castUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      usr => {
        // this.loading = true;
        this.user = usr;
      }, error => console.log(error)
    );

  }
  ngOnDestroy() {
    this.cdRef.detach();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: TIMEOUT,
      showCloseBtn: true,
      closeOnClick: true
    });
  }
  preventClose(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
