import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '@app/users/users.service';


@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
    constructor(private usersService: UsersService) {}
    resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> {
        return this.usersService.getUserById(route.params['userId']);
    }
}
