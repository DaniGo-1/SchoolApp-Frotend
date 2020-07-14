import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private http : HttpClient) { }

  private endPoint = 'http://localhost:8080/assignment';

  getAssignments() : Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.endPoint + '/all', {headers});
  }

}
