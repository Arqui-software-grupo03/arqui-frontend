import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  keyDownFunction(username, password, event) {

  }
  onSubmit(username, password, event) {
    event.preventDefault();
  }

}
