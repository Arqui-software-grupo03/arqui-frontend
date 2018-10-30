import { Injectable } from '@angular/core';
import { AppService } from '@app/app.component.service';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  httpOptions;
  postsUrl;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpOptions = appService.getHttpOptionsWithToken();
    this.postsUrl = `${appService.url}/posts/`;
  }

  getAllPosts() {
    const url = this.postsUrl;
    return this.http.get(url, this.httpOptions).pipe(retry(1), catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }

}
