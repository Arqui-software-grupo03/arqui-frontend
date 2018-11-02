import { Component, OnInit } from '@angular/core';
import { UsersService } from '@app/users/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userPhotoUrl;
  user;
  constructor(private usersService: UsersService) {
    this.userPhotoUrl = '../../assets/felipe_de_la_fuente.jpg';
   }

  ngOnInit() {
    this.usersService.getUser().subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      }, error => console.log(error)
    );
  }

  onClickEditProfile(event) {

  }

}
