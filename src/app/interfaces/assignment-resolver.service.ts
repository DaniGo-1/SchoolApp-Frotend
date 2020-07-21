import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
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

@Injectable({
  providedIn: 'root'
})
export class AssignmentByIdResolver implements Resolve<any>{

  constructor(private _api : AssignmentsService) { }

  resolve(route : ActivatedRouteSnapshot){
    const id = route.params['id'];
    return this._api.getAssignById(id).pipe(
      catchError((error) => {
        console.log('Error en resolver Assignment')
        return empty();
      })
    )
  }
}
