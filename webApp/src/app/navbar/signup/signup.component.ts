import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as $ from 'jquery';
import { UsersService } from '@app/users/users.service';
import { LogInService } from '../login/login.service';

declare var jQuery: any;
const TIMEOUT = 5000;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  btnEnable = false;
  waitingResponse = false;
  validEmail = false;
  validUsername = false;
  private userEmailTypingTimeout;
  private userNameTypingTimeout;
  private showingMessageEmail = false;
  private showingMessageUserName = false;
  constructor(private flashMessage: FlashMessagesService, private usersService: UsersService,
              private logInService: LogInService) { }

  ngOnInit() {
    this.addjQueryTooltip();
  }

  ngOnDestroy() {
   // Unsubscribe from things
  }

  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }

  keyUpValidatePassword(password: string, retypePassword: string) {
    this.btnEnable = (password.length >= 6 && retypePassword.length >= 6) &&
                        (password === retypePassword) && this.validEmail &&
                          this.validUsername ? true : false;
    if (password.length >= 6 && retypePassword.length >= 1) {
      clearTimeout(this.userEmailTypingTimeout);
      this.userEmailTypingTimeout = this.checkAfterUserTypes(password !== retypePassword &&
          !this.showingMessageEmail, 'Las contraseñas ingresadas no coinciden.', 400, 'email');
    }
  }
  keyUpCheckEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.validEmail = re.test(String(email).toLowerCase());
  }
  keyUpCheckUsername(username: string) {
    this.validUsername = username.length >= 4 ? true : false;
    clearTimeout(this.userNameTypingTimeout);
    this.userNameTypingTimeout = this.checkAfterUserTypes(
        !this.validUsername && !this.showingMessageUserName, 'Nombre de usuario mayor o igual a 4 caracteres', 300, 'user');
  }

  onSubmit(username: string, email: string, password: string, $event) {
    $event.stopPropagation();
    $event.preventDefault();
    this.waitingResponse = true;
    this.createUser(username, email, password);
  }
  keyDownFunction(username, email, password, event) {
    if (event.keyCode === 13) {
      this.onSubmit(username, email, password, event);
    }
  }

  showMessage(message: string, type: string) {
    this.flashMessage.show(message, {
      cssClass: `alert-${type}`,
      timeout: TIMEOUT,
      showCloseBtn: true,
      closeOnClick: true
    });
  }

  checkAfterUserTypes(condition: boolean, message: string, timeout: number, type: string) {
    return setTimeout( () => {
      if (condition) {
        this.showMessage(message, 'danger');
        this.changeShowingMessageState(true, timeout, type);
      }
    }, timeout);
  }

  changeShowingMessageState(value: boolean, timeout: number, type: string): void {
    if (type === 'email') {
      this.showingMessageEmail = value;
    } else {
      this.showingMessageUserName = value;
    }
    setTimeout( () => {
      if (type === 'email') {
        this.showingMessageEmail = !this.showingMessageEmail;
      } else {
        this.showingMessageUserName = !this.showingMessageUserName;
      }
    }, TIMEOUT);
  }

  preventClose(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  async createUser(username: string, email: string, password: string) {
    await this.usersService.createNewUser(username, email, password).toPromise().then(
      user => {
        this.usersService.editUser(user);
        this.showMessage('Cuenta creada satisfactoriamente!', 'success');
        this.logIn(user.email, password);
      }
    ).catch(
      error => {
        this.showMessage('Error al registrar. Intente nuevamente', 'danger');
      }
    );
    this.waitingResponse = false;
  }

  logIn(email, password) {
    this.logInService.logIn(email, password).subscribe(
      response => {
        response.email = email;
        this.showMessage('Bienvenido!', 'success');
        this.logInService.setToken(response.email, response.token);
        this.setCurrentUser(response.user);
      }, error => {
        console.log(error);
        this.showMessage('Mail o clave incorrecta', 'danger');
      }
    );
  }

  setCurrentUser(user) {
    user.token = this.logInService.getToken();
    this.usersService.editUser(user);
    this.logInService.editLogged(true);
  }
}
