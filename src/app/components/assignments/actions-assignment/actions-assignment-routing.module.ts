import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionsAssignmentComponent } from './actions-assignment.component';
import { AssignmentByIdResolver } from 'src/app/interfaces/assignment-resolver.service';

const routes: Routes = [{ path: '', component: ActionsAssignmentComponent, resolve : {assignment : AssignmentByIdResolver} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsAssignmentRoutingModule { }
