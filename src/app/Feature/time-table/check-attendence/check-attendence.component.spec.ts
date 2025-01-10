import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckAttendenceComponent } from './check-attendence.component';

describe('CheckAttendenceComponent', () => {
  let component: CheckAttendenceComponent;
  let fixture: ComponentFixture<CheckAttendenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckAttendenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
