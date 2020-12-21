import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../models/employee.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { ResolvedEmployeelistModule } from './resolved-employeelist.module';
import { catchError, map } from 'rxjs/operators';

@Injectable()
// Implement the Resolve interface, as we are implementing a route resolve guard
// Resolve interface supports generics, so specify the type of data that this
// resolver returns using the generic parameter   // ResolvedEmployeelistModule   error type
export class EmployeeListResolverService implements Resolve<Employee[] | string> {
  // Inject the employeee service as we need it to retrieve employee data
  constructor(private _employeeService: EmployeeService) {
  }
  // Resolve interface contains the following one method for which we need to
  // provide implementation. This method calls EmployeeService & returns employee data
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Employee[] | string> {
    return this._employeeService.getEmployees()
      .pipe(
        catchError((err: string) => of(err))
      );
  }
}