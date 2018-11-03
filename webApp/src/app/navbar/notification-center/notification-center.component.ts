import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '@app/users/users.service';

@Component({
  selector: 'app-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss']
})
export class NotificationCenterComponent implements OnInit {
  user;
  @Input() notifications: any;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.castUser.subscribe(
      user => this.user = user
    );
    console.log(this.notifications);
  }

}
