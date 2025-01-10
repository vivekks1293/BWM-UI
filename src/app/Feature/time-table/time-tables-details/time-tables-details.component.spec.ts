import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTablesDetailsComponent } from './time-tables-details.component';

describe('TimeTablesDetailsComponent', () => {
  let component: TimeTablesDetailsComponent;
  let fixture: ComponentFixture<TimeTablesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeTablesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTablesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
