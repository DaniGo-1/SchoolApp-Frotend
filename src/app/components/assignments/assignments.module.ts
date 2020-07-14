import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsComponent } from './assignments.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [AssignmentsComponent],
  imports: [
    CommonModule,
    AssignmentsRoutingModule,
    MaterialModule
  ]
})
export class AssignmentsModule { }
