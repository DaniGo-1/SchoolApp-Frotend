import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseResolverService implements Resolve<any>{

  constructor(private _api : CoursesService) { }

  resolve(){
    return this._api.getCourseAll().pipe(
      catchError((error) => {
        console.log(error, 'Error en resolver course')
        return empty();
      })
    )
  }
}
