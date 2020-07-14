import { Student } from './student.model';
import { Course } from './course.model';

export class Assignment{
    constructor(
        public id : number,
        public student : Student, 
        public course : Course
    ){}
}