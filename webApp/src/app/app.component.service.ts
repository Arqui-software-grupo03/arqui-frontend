import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // Apiary: http://private-bb6ce2-arquitransocialnetwork.apiary-mock.com/
    url = 'http://private-bb6ce2-arquitransocialnetwork.apiary-mock.com';
    constructor() { }
}
