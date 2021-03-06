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
  patchUserFCMTokens(userId, fcmTokensArray) {
    const body = {
      'fcmTokens': fcmTokensArray
    };
    const url = `${this.usersUrl}/${userId}/`;
    return this.http.patch(url, body, this.appService.getHttpOptionsWithToken()).pipe(catchError(this.errorHandler));
  }

  getUserById(userId: number) {
    const url = `${this.usersUrl}/${userId}/`;
    this.httpOptions = this.appService.getHttpOptionsWithToken();
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  followUser(userId: number) {
    const url = `${this.usersUrl}/${userId}/followers/`;
    return this.http.post(url, {}, this.appService.getHttpOptionsWithToken()).pipe(catchError(this.errorHandler));
  }

  editUser(user: any) {
    user.defaultImageUrl = 'assets/default-user-image.png';
    this.user.next(user);
    this.httpOptions = this.appService.getHttpOptionsWithToken();
  }
  patchUser(user: any) {
    const url = `${this.usersUrl}/${user.id}/`;
    return this.http.patch(url, user, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }
}
