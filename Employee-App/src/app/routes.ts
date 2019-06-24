import { EmployeeDetailResolver } from './_resolvers/employee-detail.resolver';
import { EmployeeDetailsComponent } from './employees/employee-details/employee-details.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { Routes, CanDeactivate } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';
import { EmployeeListResolver } from './_resolvers/employee-list.resolver';
import { EmployeeEditComponent } from './employees/employee-edit/employee-edit.component';
import { EmployeeEditResolver } from './_resolvers/employee-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsafe-changes.guard';

export const appRoutes: Routes = [
    { path : '' , component: HomeComponent},
    { path: '', runGuardsAndResolvers: 'always', canActivate: [AuthGuard],
        children: [
            { path : 'employees' , component: EmployeeListComponent, resolve : {users : EmployeeListResolver}},
            { path : 'employees/:id' , component: EmployeeDetailsComponent,
            resolve : {user : EmployeeDetailResolver}},
            { path : 'employee/edit' , component: EmployeeEditComponent,
            resolve : {user : EmployeeEditResolver}, canDeactivate: [PreventUnsavedChanges]}

        ]},
    { path : '**' , redirectTo: '', pathMatch: 'full'}
]