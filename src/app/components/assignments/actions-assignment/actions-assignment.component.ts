import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { Student } from 'src/app/models/student.model';
import { Course } from 'src/app/models/course.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StudentsService } from 'src/app/services/students.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/internal/operators/catchError';
import { empty } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { AssignmentsService } from 'src/app/services/assignments.service';

@Component({
  selector: 'app-actions-assignment',
  templateUrl: './actions-assignment.component.html',
  styleUrls: ['../assignments.component.scss']
})
export class ActionsAssignmentComponent implements OnInit {
  showCarga = false;
  data: Assignment;
  dataDefault: Assignment;
  nameStudent = '';
  nameCourse = '';
  showMessage = false;
  message = '';
  editar = false;

  constructor(private activatedRoute: ActivatedRoute, private dialog: MatDialog, private _assignmentService: AssignmentsService, private _snackBar: MatSnackBar, private router: Router) { }

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

  cancelarEditar() {
    console.log(this.dataDefault, '++++++')

    this.data = this.dataDefault;
    this.nameStudent = this.data.student.id + ' - ' + this.data.student.firstname + ' ' + this.data.student.lastname;
    this.nameCourse = this.data.course.id + ' - ' + this.data.course.description;
    console.log(this.data, '-----')
    this.editar = false;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
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
        console.log(this.data, 'ASI VA LA DATA 2')
      }
    });
  }

  selectCourse(): void {
    const dialogRef = this.dialog.open(SelectCourse, {
      width: '40%',
      data: Course
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.nameCourse = result.id + ' - ' + result.description;
        this.data['course'] = result;
        console.log(this.data, 'ASI VA LA DATA')
      }
    });
  }

  deleteAssignment() {
    const dialogRef = this.dialog.open(DeleteAssignment, {
      width: '40%',
      data: this.data
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

    });
  }

  updateAssignment() {

    this.showCarga = true;
    this._assignmentService.updateAssignment(this.data).pipe(
      catchError((error) => {
        this.showCarga = false;
        console.log('error al crear', error)
        this.openSnackBar('Error al crear la asignación, verifique los datos');
        return empty();
      })
    ).subscribe((data) => {
      this.showCarga = false;
      console.log('esto crea', data)
      this.openSnackBar("Asignación Actualizada")
      this.router.navigateByUrl('/assignments', { skipLocationChange: true }).then(() => { });

    })
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

@Component({
  selector: 'select-course',
  templateUrl: '../create-assignment/add-course.html'
})
export class SelectCourse implements OnInit {
  showCarga = false;
  showMessage = false;
  message = '';
  dataSource: MatTableDataSource<Course>;
  panelOpenState = false;
  value = '';
  dataDefault: [];

  constructor(
    public dialogRef: MatDialogRef<SelectCourse>,
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private _courseService: CoursesService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCourses();
  }

  close(): void {
    this.dialogRef.close();
  }

  getCourses() {
    this.showCarga = true;
    this.showMessage = false;
    this._courseService.getCourseAll().pipe(
      catchError((error) => {
        this.showCarga = false;
        this.openSnackBar('Error al traer cursos');
        console.log('error al traer cursos en el modal', error)
        return empty();
      })
    ).subscribe((data) => {
      this.showCarga = false;
      console.log(data, 'Data traida de cursos')
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

@Component({
  selector: "delete-assignment",
  templateUrl: "delete-assignment.html"
})
export class DeleteAssignment {
  showCarga = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteAssignment>,
    @Inject(MAT_DIALOG_DATA) public data: Assignment,
    private _assignmentService: AssignmentsService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  close(): void {
    this.dialogRef.close();
  }

  delete() {
    console.log(this.data)
    this.showCarga = true;
    this._assignmentService.deleteAssignment(this.data.id).pipe(
      catchError(error => {
        console.log(error)
        this.openSnackBar('Error al eliminar la asignación');
        return empty();
      })
    ).subscribe(data => {
      console.log(data);
      this.openSnackBar("Asignación Eliminada")
      this.showCarga = false;
      this.close()
      this.router.navigateByUrl('/assignments', { skipLocationChange: true }).then(() => { });
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}