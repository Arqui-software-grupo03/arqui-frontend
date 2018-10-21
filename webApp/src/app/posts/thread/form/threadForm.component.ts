import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-thread-form',
  templateUrl: './threadForm.component.html',
  styleUrls: ['./threadForm.component.scss']
})
export class ThreadFormComponent implements OnInit {
  userPhotoUrl;
  showThread;
  @Input() threadCounter: number;
  @Output() show = new EventEmitter();

  constructor() {
    this.userPhotoUrl = '../../assets/chau.jpg';
    this.showThread = false;
   }

  ngOnInit() {
  }
  onClickShowComments(event) {
    event.preventDefault();
    this.showThread = !this.showThread;
    this.show.emit(this.showThread);
  }

}
