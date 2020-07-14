import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseResolverService } from 'src/app/interfaces/course-resolver.service';

const routes: Routes = [{ path: '', component: CoursesComponent, resolve : {courses : CourseResolverService} }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
