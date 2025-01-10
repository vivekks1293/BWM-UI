import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTablesComponent } from './time-tables.component';

describe('TimeTablesComponent', () => {
  let component: TimeTablesComponent;
  let fixture: ComponentFixture<TimeTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeTablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
