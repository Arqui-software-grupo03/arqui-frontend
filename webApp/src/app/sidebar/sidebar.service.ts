import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppService } from '@app/app.component.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  httpOptions;
  topicsUrl;
  constructor(private appService: AppService, private http: HttpClient) { 
    this.httpOptions = appService.getHttpOptionsWithToken();
    this.topicsUrl = `${appService.url}/topics`;
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.status  || 'Server Error');
  }

}
