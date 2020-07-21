import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { Student } from 'src/app/models/student.model';
import { Course } from 'src/app/models/course.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StudentsService } from 'src/app/services/students.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/internal/operators/catchError';
import { empty } from 'rxjs';

@Component({
  selector: 'app-actions-assignment',
  templateUrl: './actions-assignment.component.html',
  styleUrls: ['../assignments.component.scss']
})
export class ActionsAssignmentComponent implements OnInit {
  showCarga = false;
  data: Assignment;
  dataDefault : Assignment;
  nameStudent = '';
  nameCourse = '';
  showMessage = false;
  message = '';
  editar = false;

  constructor(private activatedRoute: ActivatedRoute, private dialog : MatDialog) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params.id;
    console.log(params, ' ID DE LA RUTA')
    this.activatedRoute.data.subscribe((data: { assignment: Assignment }) => {
      let dt = data.assignment;
      console.log(dt, 'ESto encontro')
      this.data = new Assignment(dt.id, new Student(dt.student.id, dt.student.firstname, dt.student.lastname, dt.student.age, dt.student.grade, dt.student.section, dt.student.user, dt.student.password), new Course(dt.course.id, dt.course.description));
      this.dataDefault = new Assignment(dt.id, new Student(dt.student.id, dt.student.firstname, dt.student.lastname, dt.student.age, dt.student.grade, dt.student.section, dt.student.user, dt.student.password), new Course(dt.course.id, dt.course.description));
      this.nameStudent = dt.student.id + ' - ' + dt.student.firstname + ' ' + dt.student.lastname;
      this.nameCourse = dt.course.id + ' - ' + dt.course.description;
    })
  }

  selectStudent(): void {
    const dialogRef = this.dialog.open(SelectStudet, {
      width: '40%',
      data: Student
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.nameStudent = result.id + ' - ' + result.firstname + ' ' + result.lastname;
        this.data['student'] = result;
        console.log(this.data, 'ASI VA LA DATA')
      }
    });
  }

}

@Component({
  selector: 'select-student',
  templateUrl: '../create-assignment/add-student.html'
})
export class SelectStudet {
  showCarga = false;
  showMessage = false;
  message = '';
  dataSource: MatTableDataSource<Student>;
  panelOpenState = false;
  value = '';
  dataDefault: [];

  constructor(
    public dialogRef: MatDialogRef<SelectStudet>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private _studentService: StudentsService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getStudents();
  }

  close(): void {
    this.dialogRef.close();
  }

  getStudents() {
    this.showCarga = true;
    this.showMessage = false;
    this._studentService.getStudents().pipe(
      catchError((error) => {
        this.showCarga = false;
        this.openSnackBar('Error al traer estudiantes');
        console.log('error al traer estudiantes en el modal', error)
        return empty();
      })
    ).subscribe((data) => {
      this.showCarga = false;
      console.log(data, 'Data traida de estudiantes')
      this.dataDefault = data;
      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource.filteredData, 'esto de la table')
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  limpiar() {
    this.dataSource = new MatTableDataSource(this.dataDefault);
    this.value = '';
  }

}