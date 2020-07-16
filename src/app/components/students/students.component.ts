import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentsService } from 'src/app/services/students.service';
import { catchError } from 'rxjs/operators';
import { empty, Subscription } from 'rxjs';
import { Student } from 'src/app/models/student.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';

interface Search {
  value: string;
  viewValue: string;
}

interface Grade {
  value: number;
  viewValue: string;
}


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  showCarga = false;

  selectedValue: string;
  value = '';
  listSearch: Search[] = [
    { value: 'Grado', viewValue: 'Grado' },
    // { value: 'Curso', viewValue: 'Curso' },
    { value: 'Nombre', viewValue: 'Nombre' }
  ];

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'grado', 'seccion', 'usuario'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _studentService: StudentsService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog) { }


  ngOnInit() {
    this.activatedRoute.url.subscribe(url => console.log('The URL changed to: ' + url))
    this.getStudents();
  }

  getStudents() {
    this.value = '';
    this.activatedRoute.data.subscribe((data: { students: any }) => {
      console.log(data, 'esto trae')
      this.dataSource = new MatTableDataSource(data.students);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por página: ';
    })
  }

  getStudentsAll() {
    this.showCarga = true;
    this._studentService.getStudents().pipe(
      catchError((error) => {
        this.showCarga = false;
        console.log(error)
        this.openSnackBar('Ha ocurrido un error al buscar.')
        return empty();
      })
    ).subscribe((data) => {
      this.showCarga = false;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por página: ';
    })
  }

  buscar() {
    if (this.value != '') {
      this.showCarga = true;
      console.log('si busca')
      if (this.selectedValue == this.listSearch[0].value) {
        this._studentService.getStudentByGrande(Number(this.value)).pipe(
          catchError((error) => {
            this.showCarga = false
            console.log(error)
            this.openSnackBar('Ha ocurrido un error al buscar.')
            return empty();
          })
        ).subscribe((data) => {
          console.log(data, 'Esto trae')
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por página: ';
          this.showCarga = false
        })

      } else if (this.selectedValue == this.listSearch[1].value) {
        this._studentService.getStudentByName(this.value).pipe(
          catchError((error) => {
            this.showCarga = false
            console.log(error)
            this.openSnackBar('Ha ocurrido un error al buscar.')
            return empty();
          })
        ).subscribe((data) => {
          console.log(data, 'Esto trae')
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator._intl.itemsPerPageLabel = 'Registros por página: ';
          this.showCarga = false
        })
      } else {
        this.showCarga = false
      }
    } else {
      console.log('no busca')
      this.openSnackBar('Ingrese un valor a buscar');
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  createDialog() {
    const dialogRef = this.dialog.open(CreateStudent, {
      width: '50%',
      data: new Student(0, "", "", 0, 0, "", "", "", [])
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diaog closed');
      console.log(result);
      // this.getStudentsAll()
    })
  }


}

@Component({
  selector: 'create-student',
  templateUrl: 'create-student.html'
})
export class CreateStudent {

  showCarga = false;
  showMessage = false;
  message = '';
  hide = true;

  listGrade: Grade[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
    { value: 7, viewValue: '7' },
    { value: 8, viewValue: '8' },
    { value: 9, viewValue: '9' },
    { value: 10, viewValue: '10' }
  ];

  listSection: Search[] = [
    { value: 'A', viewValue: 'A' },
    { value: 'B', viewValue: 'B' },
    { value: 'C', viewValue: 'C' },
    { value: 'D', viewValue: 'D' },
    { value: 'E', viewValue: 'E' },
    { value: 'F', viewValue: 'F' },
    { value: 'G', viewValue: 'G' }
  ];

  constructor(
    public dialogRef: MatDialogRef<CreateStudent>,
    @Inject(MAT_DIALOG_DATA) public data: Student,
    private _studentServide: StudentsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private location: Location) {

    this.location = location;
  }

  close(): void {
    console.log('Cierra el dialog')

    this.dialogRef.close();
  }

  crear() {
    console.log('Esto agrega', this.data)
    if (this.data.firstname == '' || this.data.lastname == '' || this.data.age == 0 || this.data.grade == 0 ||
      this.data.section == '' || this.data.user == '' || this.data.password == '') {
      this.showCarga = false;
      this.showMessage = true;
      this.message = 'Ingrese todos los campos *';
    } else {
      this.showMessage = false;
      this.showCarga = true;
      this._studentServide.createStudent(this.data).pipe(
        catchError((error) => {
          this.showCarga = false
          console.log(error)
          this.openSnackBar('Error al crear, verifique los datos.')
          return empty();
        })
      ).subscribe((data) => {
        console.log(data, 'Data al crear')
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