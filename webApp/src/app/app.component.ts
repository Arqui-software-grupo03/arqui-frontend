import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '@app/navbar/navbar.component';
import { SignUpService } from './navbar/signup/sign-up.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: any;
  constructor(private service: SignUpService) {

  }
  ngOnInit() {
    this.service.castUser.subscribe(
      usr => this.user = usr
    );
    this.user.name = 'test1';
  }
  changeName() {
    this.user.name = 'test2222';
  }
}
