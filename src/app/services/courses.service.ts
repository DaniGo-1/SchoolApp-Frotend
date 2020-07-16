import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http : HttpClient) { }

  private endPoint = 'http://localhost:8080/course';

  getCourseAll() : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get(this.endPoint + '/all',{headers})
  }

  createCourse(course : Course) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    let params = JSON.stringify(course);
    return this.http.post(this.endPoint + '/create', params, {headers});
  }
}
