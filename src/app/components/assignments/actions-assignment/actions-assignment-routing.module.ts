import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionsAssignmentComponent } from './actions-assignment.component';

const routes: Routes = [{ path: '', component: ActionsAssignmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsAssignmentRoutingModule { }
