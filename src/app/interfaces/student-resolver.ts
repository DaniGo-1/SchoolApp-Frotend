import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { StudentsService } from '../services/students.service';

@Injectable({
  providedIn: 'root'
})
export class StudentResolver implements Resolve<any>  {

  constructor(private _api : StudentsService) { }
  resolve() {
    return this._api.getStudents().pipe(
      catchError((error) => {
        console.log(error, 'Error en resolver student')
        return empty();
      })
    );
  }
}
