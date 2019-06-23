import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()

export class EmployeeEditResolver implements Resolve<User>{
constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService,
    private authService: AuthService ) {}

resolve(route: ActivatedRouteSnapshot):  Observable<User>{
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
        catchError(error => {
            this.alertifyService.error('problem retrieving the data');
            this.router.navigate(['employees']);
            return of(null);
        })
    )
}

}