import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimetableDetailsComponent } from './date-timetable-details.component';

describe('DateTimetableDetailsComponent', () => {
  let component: DateTimetableDetailsComponent;
  let fixture: ComponentFixture<DateTimetableDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateTimetableDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateTimetableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
