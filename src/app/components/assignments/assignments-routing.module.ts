import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentsComponent } from './assignments.component';
import { AssignmentResolverService } from 'src/app/interfaces/assignment-resolver.service';

const routes: Routes = [
  { path: '', component: AssignmentsComponent, resolve: { assignments: AssignmentResolverService } },
  { path: 'create-assignment', loadChildren: () => import('./create-assignment/create-assignment.module').then(m => m.CreateAssignmentModule) },
  { path: 'actions-assignment/:id', loadChildren: () => import('./actions-assignment/actions-assignment.module').then(m => m.ActionsAssignmentModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssignmentsRoutingModule { }
