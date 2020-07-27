import { Component, OnInit, Inject } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { Student } from 'src/app/models/student.model';
import { Course } from 'src/app/models/course.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from 'src/app/services/students.service';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesService } from 'src/app/services/courses.service';
import { AssignmentsService } from 'src/app/services/assignments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['../assignments.component.scss']
})
export class CreateAssignmentComponent implements OnInit {
  showCarga = false;
  data: Assignment;
  nameStudent = '';
  nameCourse = '';
  showMessage = false;
  message = '';

  constructor(public dialog: MatDialog, private _assignmentService: AssignmentsService, private _snackBar: MatSnackBar, private router : Router) {
    this.data = new Assignment(0, new Student(0, "", "", 0, 0, "", "", ""), new Course(0, ""));
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  addStudent(): void {
    const dialogRef = this.dialog.open(AddStudent, {
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
  addCourse(): void {
    const dialogRef = this.dialog.open(AddCurso, {
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

  createAssignment() {
    if (this.data['student'].id == 0 || this.data['course'].id == 0) {
      this.message = 'Ingrese todos los campos *'
      this.showMessage = true;
    } else {
      this.message = '';
      this.showMessage = false;
      this.showCarga = true;
      this._assignmentService.createAssignment(this.data).pipe(
        catchError((error) => {
          this.showCarga = false;
          console.log('error al crear', error)
          this.openSnackBar('Error al crear la asignación, verifique los datos');
          return empty();
        })
      ).subscribe((data) => {
        this.showCarga = false;
        console.log('esto crea', data)

        this.router.navigateByUrl('/assignments', { skipLocationChange: true }).then(() => {});

      })
    }
  }

}

@Component({
  selector: 'add-student',
  templateUrl: 'add-student.html'
})
export class AddStudent implements OnInit {
  showCarga = false;
  showMessage = false;
  message = '';
  dataSource: MatTableDataSource<Student>;
  panelOpenState = false;
  value = '';
  dataDefault : [];

  constructor(
    public dialogRef: MatDialogRef<AddStudent>,
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

  limpiar(){
    this.dataSource = new MatTableDataSource(this.dataDefault);
    this.value = '';
  }
}

@Component({
  selector: 'add-course',
  templateUrl: 'add-course.html'
})
export class AddCurso implements OnInit {
  showCarga = false;
  showMessage = false;
  message = '';
  dataSource: MatTableDataSource<Course>;
  panelOpenState = false;
  value = '';
  dataDefault : [];

  constructor(
    public dialogRef: MatDialogRef<AddCurso>,
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

  limpiar(){
    this.dataSource = new MatTableDataSource(this.dataDefault);
    this.value = '';
  }
}

