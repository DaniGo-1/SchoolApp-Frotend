import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsAssignmentComponent } from './actions-assignment.component';

describe('ActionsAssignmentComponent', () => {
  let component: ActionsAssignmentComponent;
  let fixture: ComponentFixture<ActionsAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
