import { catchError } from 'rxjs/operators';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { User } from './../_Models/user';
import { Injectable } from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()

export class EmployeeDetailResolver implements Resolve<User>{
constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService) {}

resolve(route: ActivatedRouteSnapshot):  Observable<User>{
    return this.userService.getUser(route.params['id']).pipe(
        catchError(error => {
            this.alertifyService.error('problem retrieving data');
            this.router.navigate(['employees']);
            return of(null);
        })
    )
}

}