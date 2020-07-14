import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Search {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {

  showCarga = false;

  selectedValue: string;
  value = '';
  listSearch: Search[] = [
    { value: 'Id', viewValue: 'Id' },
    { value: 'IdCurso', viewValue: 'Id Curso' },
    { value: 'Descripcion', viewValue: 'Descripción' },
    { value: 'IdEstudiante', viewValue: 'Id Estudiante' },
    { value: 'Nombre', viewValue: 'Nombre' },
    { value: 'Grado', viewValue: 'Grado' },
  ];


  displayedColumns: string[] = ['id', 'id_course', 'description', 'id_student', 'firstname','lastname', 'grade', 'section'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.getAssignments()
  }

  getAssignments(){
    this.activatedRoute.data.subscribe((data : {assignments : any}) => {
      console.log(data.assignments, 'Esto trae')
      this.dataSource = new MatTableDataSource(data.assignments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por página: ';
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
