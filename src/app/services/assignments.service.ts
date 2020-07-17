import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  private endPoint = 'http://localhost:8080/assignment';

  getAssignments(): Observable<any> {
    return this.http.get(this.endPoint + '/all', { headers : this.headers });
  }

  createAssignment(assignment: Assignment): Observable<any> {
    let params = JSON.stringify(assignment);
    return this.http.post(this.endPoint + '/create', params, { headers : this.headers });
  }

  updateAssignment(assignment : Assignment) : Observable<any>{
    let params = JSON.stringify(assignment);
    return this.http.put(this.endPoint + '/update', params, {headers : this.headers});
  }

  deleteAssignment(id : number) : Observable<any>{
    return this.http.delete(this.endPoint + `/delete?id=${id}`, {headers : this.headers})
  }

}
