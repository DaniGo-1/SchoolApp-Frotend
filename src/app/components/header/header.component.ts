import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  events: string[] = [];
  opened = true;

  dataMenu= [
    {
      'icon' : 'contacts',
      'label' : 'Estudiantes',
      'route' : 'students'
    }, 
    {
      'icon' : 'book',
      'label' : 'Cursos',
      'route' : 'courses'
    }, 
    {
      'icon' : 'how_to_reg',
      'label' : 'Asignaciones',
      'route' : 'assignments'
    }
  ];

  ngOnInit(): void {
  }

}
