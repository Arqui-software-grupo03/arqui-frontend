import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HomepageService } from './homepage.service';
import * as $ from 'jquery';
import { Subject } from 'rxjs';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UsersService } from '@app/users/users.service';
import { takeUntil } from 'rxjs/operators';
import { LogInService } from '@app/navbar/login/login.service';

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
    private usersService: UsersService, private cdRef: ChangeDetectorRef) {

    if (this.logInService.getToken()) {
      this.logInService.getUserByToken().subscribe(
        success => {
          this.setCurrentUser();
          this.showMessage('Bienvenido!', 'success');
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }


  }

  ngOnInit() {
    this.loading = true;
    setTimeout(
      () => {
        this.loading = false;
      }, 900
    );
    this.usersService.castUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      usr => {
        // this.loading = true;
        this.user = usr;
      }
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
