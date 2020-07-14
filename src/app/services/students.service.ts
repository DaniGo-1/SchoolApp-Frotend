import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http : HttpClient) { }

  private endPoint = "http://localhost:8080/student";

  getStudents() : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.endPoint + '/all', {headers});
  }

  getStudentByGrande(grade : number) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.endPoint + `/grade/${grade}`,{headers});
  }

  getStudentByName(name : string) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.endPoint + `/byName/${name}`, {headers});
  }

  createStudent(student : Student) : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify(student);
    return this.http.post(this.endPoint, params, {headers})
  }

}
