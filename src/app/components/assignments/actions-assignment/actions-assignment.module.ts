import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsAssignmentRoutingModule } from './actions-assignment-routing.module';
import { ActionsAssignmentComponent, SelectStudet } from './actions-assignment.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [ActionsAssignmentComponent, SelectStudet],
  imports: [
    CommonModule,
    ActionsAssignmentRoutingModule,
    MaterialModule
  ]
})
export class ActionsAssignmentModule { }
