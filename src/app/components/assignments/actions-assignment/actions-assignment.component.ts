import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-actions-assignment',
  templateUrl: './actions-assignment.component.html',
  styleUrls: ['./actions-assignment.component.scss']
})
export class ActionsAssignmentComponent implements OnInit {

  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.rutaActiva.snapshot.params.id;
    console.log(params, ' ID DE LA RUTA')
  }

}
