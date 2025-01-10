import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectComponent } from './subject/subject.component';
import { TermDetailsComponent } from './term-details/term-details.component';
import { TimetablesComponent } from './time-tables/time-tables.component';
import { TimeTablesDetailsComponent } from './time-tables-details/time-tables-details.component';
import { MarkAttendenceComponent } from './mark-attendence/mark-attendence.component';
import { DateTimetableDetailsComponent } from './date-timetable-details/date-timetable-details.component';
import { CheckAttendenceComponent } from './check-attendence/check-attendence.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'subjects', component: SubjectComponent },
  { path: 'termdetails', component: TermDetailsComponent },
  { path: 'timetables', component: TimetablesComponent },
  { path: 'timetabledetails/:id', component: TimeTablesDetailsComponent },
  { path: 'markattendence', component: MarkAttendenceComponent },
  { path: 'attendencedetails/:attendenceId', component: DateTimetableDetailsComponent },
  { path: 'checkattendence', component: CheckAttendenceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeTableRoutingModule { }
