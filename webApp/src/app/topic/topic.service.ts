import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppService } from '@app/app.component.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TouchSequence } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  httpOptions;
  topicsUrl;
  constructor(private appService: AppService, private http: HttpClient) { 
    this.httpOptions = appService.getHttpOptionsWithToken();
    this.topicsUrl = `${appService.url}/topics/`;
  }

  createTopic(title, description) {
    const body = {
      title: title,
      description: description,
    };
    const url = this.topicsUrl;
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getTopic(topicId) {
    const url = `${this.topicsUrl}${topicId}/`;
    return this.http.get(url, this.httpOptions);
  }

  getAllTopics() {
    return this.http.get(this.topicsUrl, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  addPostToTopic(topicId, postId) {
    const body = {
      post_id: postId,
      topic: topicId
    };
    const url = `${this.topicsUrl}${topicId}/post/`;
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  deletePostfromTopic(topicId, postId) {
    const url = `${this.topicsUrl}${topicId}/post/${postId}/`;
    return this.http.delete(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getAllPostFromTopic(topicId) {
    const url = `${this.topicsUrl}${topicId}/post/`;
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  subscribeUserToTopic(topicId, userId) {
    const url = `${this.topicsUrl}${topicId}/subscribers/`;
    const body = {
      user_id: userId,
      topic: topicId
    };
    return this.http.post(url, body, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  unsubscribeUserToTopic(topicId, userId) {
    const url = `${this.topicsUrl}${topicId}/subscribers/${userId}/`;
    return this.http.delete(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  getAllSubscribersFromTopic(topicId) {
    const url = `${this.topicsUrl}${topicId}/subscribers/`;
    return this.http.get(url, this.httpOptions).pipe(catchError(this.errorHandler));
  }



  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }

}
