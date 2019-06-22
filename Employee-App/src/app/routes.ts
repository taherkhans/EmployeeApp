import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    { path : '' , component: HomeComponent},
    { path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        children: [
            { path : 'employees' , component: EmployeeListComponent}
        ]},
    { path : '**' , redirectTo: '', pathMatch: 'full'}
]