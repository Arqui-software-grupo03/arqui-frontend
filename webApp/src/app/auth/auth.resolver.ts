import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInService } from '@app/navbar/login/login.service';

@Injectable()
export class AuthResolver implements Resolve<any> {
    constructor(private logInService: LogInService) {}
    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.logInService.getUserByToken();
    }
}
