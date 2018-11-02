import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '@app/app.component.service';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {

  httpOptions;
  postsUrl;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpOptions = appService.getHttpOptionsWithToken();
    this.postsUrl = `${appService.url}/posts/`;
  }

  createAnswer(postId, userId, content) {
    const body = {
      user_id: userId,
      content: content,
      post: postId
    };
    const url = `${this.postsUrl}/${postId}/answers`;
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  editAnswer(postId, answerId, content) {
    const body = {content: content};
    const url = `${this.postsUrl}/${postId}/answers/${answerId}`;
    return this.http.patch(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  deleteAnswer(postId, answerId) {
    const url = `${this.postsUrl}/${postId}/answers/${answerId}`;
    return this.http.delete(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getAllAnswers(postId) {
    const url = `${this.postsUrl}/${postId}/answers`;
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }
}
