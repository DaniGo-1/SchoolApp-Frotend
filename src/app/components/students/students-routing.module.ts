import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentsComponent } from './students.component';
import { StudentResolver } from 'src/app/interfaces/student-resolver';

const routes: Routes = [{ path: '', component: StudentsComponent, resolve: { students: StudentResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
