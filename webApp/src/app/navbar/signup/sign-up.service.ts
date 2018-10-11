import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private user = new BehaviorSubject<{'name': string}>({'name': ''});
  castUser = this.user.asObservable();
  constructor() { }
}
