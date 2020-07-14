import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent, CreateStudent } from './students.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [
    StudentsComponent,
    CreateStudent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MaterialModule
  ]
})
export class StudentsModule { }
