import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { LogInService } from './navbar/login/login.service';
import { UsersService } from './users/users.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { takeUntil, mergeMapTo } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppService } from './app.component.service';
import { FireBaseLocalService } from './firebase.service';

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
  public loading = true;
  message;
  constructor(private logInService: LogInService, private flashMessage: FlashMessagesService,
    private usersService: UsersService, private cdRef: ChangeDetectorRef,
    private appService: AppService, private fbService: FireBaseLocalService) {
  }

  ngOnInit() {
    this.appService.castLoading.subscribe(
      val => this.loading = val
    );
    this.usersService.castUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      usr => {
        this.user = usr;
        if (this.user.id !== undefined) {
          // if (this.user.fcmTokens.length === 0) {
            this.fbService.requestPermission(`user-${this.user.id}`);
            // this.fbService.receiveMessage();
          // }
        }
      }
    );
    if (this.logInService.getToken()) {
      this.logInService.getUserByToken().subscribe(
        user => {
          if (user) {
            this.setCurrentUser(user);
            this.showMessage('Bienvenido!', 'success');
            this.appService.editLoading(false);
          } else {
            this.logInService.removeToken();
            this.appService.editLoading(false);
          }
        },
        error => {
          this.appService.editLoading(false);
        }
      );
    } else {
      this.appService.editLoading(false);
    }
    this.message = this.fbService.currentMessage;
  }
  ngOnDestroy() {
    this.cdRef.detach();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  setCurrentUser(user) {
    user.token = this.logInService.getToken();
    this.usersService.editUser(user);
    this.logInService.editLogged(true);
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
