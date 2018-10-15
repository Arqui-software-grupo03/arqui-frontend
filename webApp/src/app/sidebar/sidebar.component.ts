import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  username;
  userEmail;
  userPhotoUrl;
  constructor() {
    this.username = 'Felipe De la Fuente';
    this.userEmail = 'fadelafuente1@gmail.com';
    this.userPhotoUrl = '../../assets/felipe_de_la_fuente.jpg';
   }

  ngOnInit() {
  }

  onClickEditProfile(event) {

  }

}
