import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsAssignmentRoutingModule } from './actions-assignment-routing.module';
import { ActionsAssignmentComponent } from './actions-assignment.component';


@NgModule({
  declarations: [ActionsAssignmentComponent],
  imports: [
    CommonModule,
    ActionsAssignmentRoutingModule
  ]
})
export class ActionsAssignmentModule { }
