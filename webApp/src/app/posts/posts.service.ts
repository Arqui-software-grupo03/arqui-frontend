import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppService } from '@app/app.component.service';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private topicPosts = new BehaviorSubject([]);
  castTopicPosts = this.topicPosts.asObservable();
  httpOptions;
  postsUrl;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpOptions = appService.getHttpOptionsWithToken();
    // this.postsUrl = `${appService.url}/posts`;
    // this.postsUrl = `http://localhost:8100/posts`;
    this.postsUrl = `${appService.publicApiUrl}/posts`;
  }

  getAllPosts(): Observable<any> {
    const url = `${this.postsUrl}/`;
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }
  createNewPost(content: string, userId): Observable<any> {
    const url = `${this.postsUrl}/`;
    const body = {
      'user_id': userId,
      'content': content
    };
    // console.log(this.httpOptions);
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  editPost(postId, content): Observable<any> {
    const url = `${this.postsUrl}/${postId}/`;
    const body = {content: content};
    return this.http.patch(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  deletePost(postId): Observable<any> {
    const url = `${this.postsUrl}/${postId}/`;
    return this.http.delete(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getPost(postId): Observable<any> {
    const url = `${this.postsUrl}/${postId}/`;
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  addPostToCastTopicPosts(post: any) {
    const posts = this.topicPosts.value;
    posts.push(post);
    this.topicPosts.next(posts);
  }

  updateCastTopicPosts(postsArray: any) {
    this.topicPosts.next(postsArray);
  }
  getAllPostsFromCastValue() {
    return this.topicPosts.value;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }
}

