import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from 'src/app/models/course.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { CoursesService } from 'src/app/services/courses.service';
import { catchError } from 'rxjs/operators';
import { empty } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  value = '';

  displayedColumns: string[] = ['id', 'description','actions'];
  dataSource: MatTableDataSource<Course>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.activatedRoute.data.subscribe((data: { courses: any }) => {
      console.log(data, 'Data de cursos')
      this.dataSource = new MatTableDataSource(data.courses);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por página: ';
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createDialog(): void {
    const dialogRef = this.dialog.open(CreateDialog, {
      width: '35%',
      data: new Course(0, '')
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
  
  actionsDialog(data: Course) {
    const dialogRef = this.dialog.open(ActionsCourse, {
      width: '50%',
      data: new Course(data.id, data.description)
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diaog closed');
      console.log(result);
      // this.getStudentsAll()
    })
  }

  limpiar(){
    this.getCourses()
    this.value = '';
  }

}

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.html'
})
export class CreateDialog {
  showCarga = false;
  showMessage = false;
  message = '';

  constructor(
    public dialogRef: MatDialogRef<CreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private _courseService: CoursesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private location: Location) {
    this.location = location;
  }

  close(): void {
    this.dialogRef.close();
  }

  createCourse() {
    console.log(this.data, '-- Data Course --')
    if (this.data.description == '') {
      this.message = 'Ingrese la Descripción';
      this.showMessage = true;
    } else {
      this.showMessage = false;
      this.showCarga = true;
      this._courseService.createCourse(this.data).pipe(
        catchError((error) => {
          this.showCarga = false
          console.log(error, 'Error al crear');
          this.openSnackBar('Error al crear curso, verifique los datos.');
          return empty();
        })
      ).subscribe((res) => {
        this.openSnackBar('Curso creado.')
        console.log(res, 'Data al crear')
      this.openSnackBar('Curso agregado.')
        this.showCarga = false;
        this.dialogRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.location.path()]);
        });
      })
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }


}

@Component({
  selector : 'actions-course',
  templateUrl : 'actions-course.html'
})

export class ActionsCourse{
  showCarga = false;
  showMessage = false;
  message = '';
  hide = true;
  editar = false;
  eliminar = false;

  constructor(
    public dialogRef: MatDialogRef<ActionsCourse>,
    @Inject(MAT_DIALOG_DATA) public data: Course,
    private _courseServide: CoursesService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private location: Location) {

    this.location = location;
  }

  close(): void {
    console.log('Cierra el dialog')

    this.dialogRef.close();
  }

  actualizar() {
    console.log('Esto actualiza', this.data)
    if (this.data.description == '') {
      this.message = 'Ingrese la Descripción';
      this.showMessage = true;
    } else {
      this.showMessage = false;
      this.showCarga = true;
      this._courseServide.updateCourse(this.data).pipe(
        catchError((error) => {
          this.showCarga = false
          console.log(error)
          this.openSnackBar('Error al actualizar, verifique los datos.')
          return empty();
        })
      ).subscribe((data) => {
        console.log(data, 'Data al actualizar')
        this.openSnackBar('Curso actualizado.')
        this.showCarga = false;
        this.dialogRef.close();
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.location.path()]);
        });
      })
    }
  }

  eliminarCourse() {
    this.showMessage = false;
    this.showCarga = true;
    this._courseServide.deleteCourse(this.data.id).pipe(
      catchError((error) => {
        this.showCarga = false
        console.log(error)
        this.openSnackBar('Error al eliminar, verifique los datos.')
        return empty();
      })
    ).subscribe((data) => {
      console.log(data, 'Data al eliminar')
      this.openSnackBar('Curso eliminado.')
      this.showCarga = false;
      this.dialogRef.close();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.location.path()]);
      });
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