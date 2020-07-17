import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http : HttpClient) { }

  private endPoint = "http://localhost:8080/student";

  getStudents() : Observable<any>{
    return this.http.get(this.endPoint + '/all', {headers : this.headers});
  }

  getStudentByGrande(grade : number) : Observable<any>{
    return this.http.get(this.endPoint + `/grade/${grade}`,{headers : this.headers});
  }

  getStudentByName(name : string) : Observable<any>{
    return this.http.get(this.endPoint + `/byName/${name}`, {headers : this.headers});
  }

  createStudent(student : Student) : Observable<any>{
    let params = JSON.stringify(student);
    return this.http.post(this.endPoint, params, {headers : this.headers})
  }

  updateStudent(student : Student) : Observable<any>{
    let params = JSON.stringify(student);
    return this.http.put(this.endPoint, params, {headers : this.headers});
  }

  deleteStudent(id : number) : Observable<any>{
    return this.http.delete(this.endPoint + `/delete/${id}`,{headers : this.headers})
  }

}
