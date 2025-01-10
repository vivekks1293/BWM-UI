import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-check-attendence',
  standalone: false,

  templateUrl: './check-attendence.component.html',
  styleUrl: './check-attendence.component.scss'
})
export class CheckAttendenceComponent {
  timetables: any[] = [];
  termID: number | null = null;
  termName: string | null = null;
  subjects: any[] = [];
  attendanceRecords: any[] = [];
  attendanceSummary: any[] = [];
  showPopup: boolean = false;
  selectedTimeTableName:string = "";
  constructor(private timetableService: TimetableService, private router: Router) { }

  ngOnInit(): void {
    const selectedTerm = this.timetableService.getSelectedTerm();
    this.termID = selectedTerm.termID;
    this.termName = selectedTerm.termName;

    this.fetchTimetables();
    this.fetchSubjects();
  }

  fetchTimetables() {
    if (this.termID) {
      this.timetableService.getTimetables(this.termID).subscribe((response: any) => {
        if (response.success) {
          this.timetables = response.timetables;
          for (let i = 0; i < this.timetables.length; ++i) {
            if (this.timetables[i].Is_Selected == 1) {
              this.timetables[i].isChecked = true;
            }
            else {
              this.timetables[i].isChecked = false;
            }
          }
        }
      });
    }
  }

  fetchSubjects() {
    if (this.termID) {
      this.timetableService.getSubjects(this.termID).subscribe((response: any) => {
        if (response.success) {
          this.subjects = response.subjects;
        }
      });
    }
  }
  fetchAttendanceRecords(timetableId: number): void {
    this.timetableService.getAttendanceByTimetable(timetableId).subscribe((response: any) => {
      if (response.success) {
        this.attendanceRecords = response.attendanceRecords;
        for (let i = 0; i < this.attendanceRecords.length; ++i) {
          this.attendanceRecords[i].TimeTableData = JSON.parse(this.attendanceRecords[i].Data);
        }
        if(this.attendanceRecords[0]?.TimeTableData != undefined && this.attendanceRecords[0]?.TimeTableData != null){
          this.attendanceSummary = this.summarizeAttendance(this.attendanceRecords);
          this.showPopup = true;
        }
        else{
          alert('No Attendance record found');
        }
      } else {
        this.attendanceRecords = [];
      }
    });
  }

  viewAttendance(id: any, timeTableName: string) {
    this.fetchAttendanceRecords(id);
    this.selectedTimeTableName = timeTableName
  }
  goBack() {
    this.router.navigate(['timetable/termdetails']);
  }


  summarizeAttendance(data: any[]): any[] {
    const summary: { [key: string]: any } = {};

    data.forEach((entry) => {
      const { TimeTableData } = entry;

      TimeTableData.forEach((row: any[]) => {
        row.forEach((cell: any) => {
          const { SubjectId, SubjectName, IsPresent } = cell;
          if (!SubjectId || SubjectName === "No Class") {
            return;
          }
          if (!summary[SubjectId]) {
            summary[SubjectId] = {
              SubjectId,
              SubjectName,
              TotalAttendance: 0,
              Present: 0,
              Absent: 0,
            };
          }
          summary[SubjectId].TotalAttendance += 1;
          if (IsPresent) {
            summary[SubjectId].Present += 1;
          } else {
            summary[SubjectId].Absent += 1;
          }
        });
      });
    });
    const result = Object.values(summary).map((subject: any) => {
      const { Present, TotalAttendance } = subject;
      return {
        ...subject,
        PresentPercentage: ((Present / TotalAttendance) * 100).toFixed(2),
        AbsentPercentage: (((TotalAttendance - Present) / TotalAttendance) * 100).toFixed(2),
      };
    });
    const totalPresent = result.reduce((sum, item) => sum + item.Present, 0);
    const totalAbsent = result.reduce((sum, item) => sum + item.Absent, 0);
    const totalAttendance = totalPresent + totalAbsent;

    result.push({
      SubjectId: "Total",
      SubjectName: "Total",
      TotalAttendance: totalAttendance,
      Present: totalPresent,
      Absent: totalAbsent,
      PresentPercentage: ((totalPresent / totalAttendance) * 100).toFixed(2),
      AbsentPercentage: ((totalAbsent / totalAttendance) * 100).toFixed(2),
    });
    return result;
  }
  closePopup(): void {
    this.showPopup = false;
    this.attendanceSummary = [];
  }
}
