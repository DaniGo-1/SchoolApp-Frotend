import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentsComponent } from './assignments.component';
import { AssignmentResolverService } from 'src/app/interfaces/assignment-resolver.service';

const routes: Routes = [{ path: '', component: AssignmentsComponent, resolve : {assignments : AssignmentResolverService} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
