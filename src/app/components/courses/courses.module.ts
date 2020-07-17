import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent, CreateDialog, ActionsCourse } from './courses.component';
import { MaterialModule } from 'src/app/material';


@NgModule({
  declarations: [CoursesComponent, CreateDialog, ActionsCourse],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MaterialModule
  ]
})
export class CoursesModule { }
