import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UsersService } from '@app/users/users.service';

const TIMEOUT = 5000;
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  inputText: string;
  user;
  constructor(private usersService: UsersService, private flashMessages: FlashMessagesService, private postsService: PostsService) { }

  ngOnInit() {
    this.inputText = '';
    this.usersService.castUser.subscribe(
      user => {
        this.user = user;
      }
    );
  }
  onChangeInput(event) {
    this.inputText = event.target.value;
  }

  onSubmit(event) {
    this.postsService.createNewPost(this.inputText).subscribe(response => {
      console.log(response);
      this.inputText = '';
      this.showMessage('¡Publicación creada correctamente!', 'success');
    }, error => {
      console.log(error);
      this.showMessage('Hubo un problema al ingresar el post, intente nuevamente.', 'danger');
    });

  }
  onKeyDown(event) {
    this.onChangeInput(event);
    if (event.keyCode === 13) {
      this.onSubmit(event);
    }
  }
  showMessage(message: string, type: string) {
    this.flashMessages.show(message, {
      cssClass: `alert-${type}`,
      timeout: TIMEOUT,
      showCloseBtn: true,
      closeOnClick: true
    });
  }

}
