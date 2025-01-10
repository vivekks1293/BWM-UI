import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeTableRoutingModule } from './time-table-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectComponent } from './subject/subject.component';
import { TermDetailsComponent } from './term-details/term-details.component';
import { TimetablesComponent } from './time-tables/time-tables.component';
import { TimeTablesDetailsComponent } from './time-tables-details/time-tables-details.component';
import { MarkAttendenceComponent } from './mark-attendence/mark-attendence.component';
import { DateTimetableDetailsComponent } from './date-timetable-details/date-timetable-details.component';
import { CheckAttendenceComponent } from './check-attendence/check-attendence.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SubjectComponent,
    TermDetailsComponent,
    TimetablesComponent,
    TimeTablesDetailsComponent,
    MarkAttendenceComponent,
    DateTimetableDetailsComponent,
    CheckAttendenceComponent
  ],
  imports: [
    CommonModule,
    TimeTableRoutingModule,
    FormsModule
  ]
})
export class TimeTableModule { }
