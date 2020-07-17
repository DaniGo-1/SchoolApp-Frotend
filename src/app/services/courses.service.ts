import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http : HttpClient) { }

  private endPoint = 'http://localhost:8080/course';

  getCourseAll() : Observable<any>{
    return this.http.get(this.endPoint + '/all',{headers : this.headers})
  }

  createCourse(course : Course) : Observable<any>{
    let params = JSON.stringify(course);
    return this.http.post(this.endPoint + '/create', params, {headers : this.headers});
  }

  updateCourse(course : Course) : Observable<any>{
    let params = JSON.stringify(course);
    return this.http.put(this.endPoint + '/update',params, {headers : this.headers})
  }

  deleteCourse(id : number) : Observable<any>{
    return this.http.delete(this.endPoint + `/delete?id=${id}`, {headers : this.headers})
  }

}
