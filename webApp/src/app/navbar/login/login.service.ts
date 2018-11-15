import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppService } from '@app/app.component.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogInService {
  httpOptions;
  logInUrl;
  private logged = false;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpOptions = appService.httpOptions;
    this.logInUrl = `${appService.url}/login/`;
  }

  getUserByEmail(email: string, password: string): Observable<any> {
    const body = {
      'user': {
        'email': email,
        'password': password
      }
    };
    return this.http.post(this.logInUrl, body, this.httpOptions).pipe(retry(1), catchError(this.errorHandler));
  }

  getUserByToken(): Observable<any> {
    const body = {
      'token': this.getToken()
    };
    const httpOptions = this.appService.getHttpOptionsWithToken();
    return this.http.post(this.logInUrl, body, httpOptions).pipe(retry(1), catchError(this.errorHandler));
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getEmail(): string {
    return localStorage.getItem('email');
  }

  setToken(email: string, token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
  }

  removeToken(): void {
    localStorage.clear();
  }

  hasToken(): boolean {
    return this.getToken() !== null ? true : false;
  }

  editLogged(value: boolean) {
    this.logged = value;
  }

  isUserLogged(): boolean {
    return this.logged;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }

}
