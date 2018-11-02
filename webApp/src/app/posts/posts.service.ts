import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '@app/app.component.service';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  httpOptions;
  postsUrl;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpOptions = appService.getHttpOptionsWithToken();
    this.postsUrl = `${appService.url}/posts/`;
  }

  getAllPosts() {
    const url = this.postsUrl;
    console.log(this.httpOptions);
    return this.http.get(url, this.httpOptions).pipe(retry(1), catchError(this.errorHandler));
  }
  createNewPost(content) {
    const url = this.postsUrl;
    const body = {'content': content};
    console.log(this.httpOptions);
    return this.http.post(url, body, this.httpOptions).pipe(retry(1), catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }
}

