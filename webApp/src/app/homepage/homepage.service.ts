import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
    private logInHome = new BehaviorSubject(false);
    private signUpHome = new BehaviorSubject(false);
    castLogInHome = this.logInHome.asObservable();
    castSignUpHome = this.signUpHome.asObservable();
    constructor() { }

    editVariables(type: string, value: boolean) {
        if (type === 'login') {
            this.logInHome.next(value);
        } else {
            this.signUpHome.next(value);
        }
    }
}
