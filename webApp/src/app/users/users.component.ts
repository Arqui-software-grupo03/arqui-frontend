import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import * as $ from 'jquery';

declare var jQuery: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user;
  uploader: CloudinaryUploader = new CloudinaryUploader(
     new CloudinaryOptions({ cloudName: 'djc5vnrki', uploadPreset: 'oiw15i7w' })
    );

  loading: any;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.castUser.subscribe(
      usr => this.user = usr
    );
    setTimeout(
      () => this.getData(), 50
    );
    this.addjQueryTooltip();
  }

   upload() {
    this.loading = true;
    this.uploader.uploadAll();
    this.uploader.onSuccessItem =  (item: any, response: string, status: number, headers: any): any => {
        const res: any = JSON.parse(response);
        console.log(res.secure_url);
        this.user.imageUrl = res.secure_url;
        console.log(this.user);
        this.usersService.editUser(this.user);
        this.usersService.patchUser(this.user).subscribe(
          user => {
            console.log(user);
            console.log('succes');
          }
        );
      };
    this.uploader.onErrorItem = function(fileItem, response, status, headers) {
         console.log('onErrorItem', fileItem, response, status, headers);
      };
   }

  getData() {
    this.user.followers = 10;
    this.user.following = 20;
    this.user.url = 'https://s17.postimg.cc/xcbukrwdr/Hugh_Jackman_f.jpg';
    this.user.username = 'Name';
  }

  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }

}
