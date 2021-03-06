import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    // Apiary: http://private-bb6ce2-arquitransocialnetwork.apiary-mock.com/
    // Apiary 'http://private-aa901-arquitransocialnetwork.apiary-mock.com'
    url = 'http://private-aa901-arquitransocialnetwork.apiary-mock.com';
    publicApiUrl = 'https://charette9.ing.puc.cl/api';

    daysOfTheWeek = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'Mayo', 'Jun',
    'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'];

    private loading = new BehaviorSubject(true);
    castLoading = this.loading.asObservable();
    constructor() { }

    editLoading(value: boolean) {
        this.loading.next(value);
    }
    getHttpOptionsWithToken() {
        // console.log(`Bearer ${localStorage.getItem('token')}`);
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') ? localStorage.getItem('token') : ''}`,
            })
        };
    }
}
