import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateAssignmentComponent } from './create-assignment.component';

const routes: Routes = [{ path: '', component: CreateAssignmentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAssignmentRoutingModule { }
