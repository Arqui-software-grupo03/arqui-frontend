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
            // if (requiredRoles === null || requiredRoles.includes(this.usersService.getRole())) {
            //    return true;
            // } else {
            //    this.routerNav.navigate(['home']);
            //    return false;
            // }
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
                    user.email = email;
                    user.token = token;
                    // user.role = this.roles[user.role];
                    this.usersService.editUser(user);
                    this.logInService.editLogged(true);
                    /* if (requiredRoles === null || requiredRoles.includes(user.role)) {
                        this.location.go(state.url);
                        this.routerNav.navigate([state.url]);
                        return true;
                    }
                    this.routerNav.navigate(['home']);
                    return false; */
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
