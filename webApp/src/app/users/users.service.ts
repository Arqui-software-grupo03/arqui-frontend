import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user = new BehaviorSubject({});
  castUser = this.user.asObservable();
  constructor() { }

  editUser(user: any) {
    this.user.next(user);
  }
}
