import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '@app/app.component.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  httpOptions;
  signUpUrl;
  constructor(private appService: AppService, private http: HttpClient) {
    this.httpOptions = appService.httpOptions;
    this.signUpUrl = `${appService.url}/login`;
  }
}
