import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) },
  { path: 'students', loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule) },
  { path: 'courses', loadChildren: () => import('./components/courses/courses.module').then(m => m.CoursesModule) },
  { path: 'assignments', loadChildren: () => import('./components/assignments/assignments.module').then(m => m.AssignmentsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
