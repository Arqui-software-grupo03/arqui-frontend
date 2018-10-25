import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LogInService } from './navbar/login/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UsersService } from './users/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

const TIMEOUT = 5000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  user: any;
  private ngUnsubscribe = new Subject();
  constructor(private logInService: LogInService, private flashMessage: FlashMessagesService,
              private usersService: UsersService, private cdRef: ChangeDetectorRef,
              private route: ActivatedRoute) {

    this.logInService.getUserByToken().subscribe(
      success => {
        this.setCurrentUser();
      },
      error => {}
    );


  }
  ngOnInit() {
    this.usersService.castUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      usr => this.user = usr
    );

  }
  ngOnDestroy() {
    this.cdRef.detach();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  setCurrentUser() {
    const usr = {
      'token': this.logInService.getToken(),
      'email': this.logInService.getEmail()
    };
    this.usersService.editUser(usr);
  }
  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: TIMEOUT
    });
  }
  preventClose(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
