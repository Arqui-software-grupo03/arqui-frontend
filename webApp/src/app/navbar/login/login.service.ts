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
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpOptions = appService.httpOptions;
    this.logInUrl = `${appService.url}/login`;
  }

  getUserByEmail(email: string, password: string): Observable<any> {
    const body = {
      'email': email,
      'password': password
    };
    return this.http.post(this.logInUrl, body, this.httpOptions).pipe(retry(2), catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }

}
