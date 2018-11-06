import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppService } from '@app/app.component.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private user = new BehaviorSubject({});
  castUser = this.user.asObservable();
  httpOptions;
  usersUrl;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpOptions = appService.httpOptions;
    // this.usersUrl = `${appService.url}/users`;
    this.usersUrl = `${appService.publicApiUrl}/users`;
  }

  createNewUser(username: string, email: string, password: string): Observable<any> {
    const body = {
      'username': username,
      'email': email,
      'password': password
    };
    const url = `${this.usersUrl}/`;
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }
  getUserById(userId: number) {
    const url = `${this.usersUrl}/search/${userId}/`;
    this.httpOptions = this.appService.getHttpOptionsWithToken();
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  editUser(user: any) {
    this.user.next(user);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }
}
