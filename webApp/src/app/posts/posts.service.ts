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
    // this.postsUrl = `${appService.url}/posts`;
    this.postsUrl = `http://localhost:8100/posts`;
  }

  getAllPosts(): Observable<any> {
    const url = `${this.postsUrl}/`;
    // console.log(this.httpOptions);
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }
  createNewPost(content: string): Observable<any> {
    const url = `${this.postsUrl}/`;
    console.log(content);
    const body = {
      'user_id': 1,
      'content': content
    };
    // console.log(this.httpOptions);
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  editPost(postId, content) {
    const url = `${this.postsUrl}/${postId}/`;
    const body = {content: content};
    return this.http.patch(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  deletePost(postId) {
    const url = `${this.postsUrl}/${postId}/`;
    return this.http.delete(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getPost(postId) {
    const url = `${this.postsUrl}/${postId}/`;
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }


  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }
}

