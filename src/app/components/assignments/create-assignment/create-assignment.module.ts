import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateAssignmentRoutingModule } from './create-assignment-routing.module';
import { CreateAssignmentComponent, AddStudent, AddCurso } from './create-assignment.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [CreateAssignmentComponent, AddStudent, AddCurso],
  imports: [
    CommonModule,
    CreateAssignmentRoutingModule,
    MaterialModule
  ]
})
export class CreateAssignmentModule { }
