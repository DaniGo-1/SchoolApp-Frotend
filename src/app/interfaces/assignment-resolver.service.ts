import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AssignmentsService } from '../services/assignments.service';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentResolverService implements Resolve<any>{

  constructor(private _api : AssignmentsService) { }

  resolve(){
    return this._api.getAssignments().pipe(
      catchError((error) => {
        console.log('Error en resolver Assignment')
        return empty();
      })
    )
  }
}
