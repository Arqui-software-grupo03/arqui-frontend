import { CanActivate, ActivatedRouteSnapshot,
    RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UsersService } from '@app/users/users.service';
import { LogInService } from '@app/navbar/login/login.service';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class Authenticate implements CanActivate {
    // roles = {1: 'admin', 2: 'boss', 3: 'secretary'};
    constructor(private usersService: UsersService, private routerNav: Router,
                private logInService: LogInService, private location: Location) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.logInService.isUserLogged()) {
            return true;
        }
        // User might be logged
        const token = this.logInService.getToken();
        const email = this.logInService.getEmail();
        if (!(email && token)) {
            this.routerNav.navigate(['home']);
            return false;
        } else {
            this.logInService.getUserByToken().subscribe(
                user => {
                    // console.log(user);
                    user.email = email;
                    user.token = token;
                    this.usersService.editUser(user);
                    this.logInService.editLogged(true);
                    this.location.go(state.url);
                    this.routerNav.navigate([state.url]);
                    return true;
                },
                error => {
                    this.logInService.editLogged(false);
                    this.logInService.removeToken();
                    this.routerNav.navigate(['home']);
                    return false;
                }
            );
        }
    }
}
