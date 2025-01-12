import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-date-timetable-details',
  standalone: false,

  templateUrl: './date-timetable-details.component.html',
  styleUrl: './date-timetable-details.component.scss'
})
export class DateTimetableDetailsComponent {

  attendenceId: number | null = null;
  attendanceDetails: any | null = null;
  timetableDetails: any | null = null;
  timetableGrid: any | null = null;
  days: any = [];
  columns: any = [];
  selectedDay: number | null = null;
  selectedClass: number | null = null;
  selectedSubjectId: number | null = null;
  selectedSubjectName: string | null = null;
  showPopup = false;
  comments: string = '';
  isPresent: boolean | null = null;
  rowComment: string = '';
  isRowPresent: boolean | null = false;
  showRowPopup: boolean = false;
  selectedRowDay: number | null = null;


  constructor(private router: Router, private route: ActivatedRoute, private timetableService: TimetableService) { }

  ngOnInit(): void {
    this.attendenceId = Number(this.route.snapshot.paramMap.get('attendenceId'));
    if (this.attendenceId) {
      this.fetchAttendanceDetails(this.attendenceId);
    }
  }

  fetchAttendanceDetails(attendenceId: number): void {
    this.timetableService.getAttendanceDetails(attendenceId).subscribe((response: any) => {
      if (response.success) {
        this.attendanceDetails = response.attendance;
        this.fetchTimetableDetails(response.attendance.TimeTableId, this.attendanceDetails.Data)
      } else {
        this.attendanceDetails = null;
      }
    });
  }

  fetchTimetableDetails(timetableId: number, gridData: any): void {
    this.timetableService.getTimetableDateDetails(timetableId).subscribe((response: any) => {
      if (response.success) {
        this.timetableDetails = response.timetable;
        this.days = Array.from({ length: this.timetableDetails.no_of_day_per_week }, (_, i) =>
          ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]
        );

        this.columns = Array.from({ length: this.timetableDetails.no_of_class_per_day }, (_, i) => i + 1);

        if (gridData) {
          this.timetableGrid = JSON.parse(gridData);
        } else {
          this.timetableGrid = Array.from({ length: this.timetableDetails.no_of_day_per_week }, () =>
            Array.from({ length: this.timetableDetails.no_of_class_per_day }, () => ({
              SubjectId: null,
              SubjectName: "No Class",
            }))
          );
        }
      } else {
        this.timetableDetails = null;
      }
    });
  }


  saveAttendence() {
    if (this.attendanceDetails.TimeTableId) {
      const timeTableDataString = JSON.stringify(this.timetableGrid);

      const payload = {
        timetableGrid: timeTableDataString,
      };
      if (!this.attendenceId) {
        alert('No attendance record selected.');
        return;
      }
      this.timetableService.updateAttendanceData(this.attendenceId, timeTableDataString).subscribe(
        (response: any) => {
          alert('Attendance record updated successfully!');
          console.log('Response:', response);
          this.closePopup(); // Close the popup on success
        },
        (error) => {
          alert('Failed to update attendance record.');
          console.error('Error:', error);
        }
      );
      // this.timetableService.updatekAttendanceData(this.attendenceId, payload).subscribe((response: any) => {
      //   if (response.success) {
      //     alert('Timetable data saved successfully!');
      //   } else {
      //     alert('Error saving timetable data!');
      //   }
      // });

    }
  }
  goBack() {
    this.router.navigate(['timetable/markattendence']);
  }

  closePopup(): void {
    if (this.selectedDay !== null && this.selectedClass !== null) {
      this.timetableGrid[this.selectedDay][this.selectedClass].Comments = this.comments;
      this.timetableGrid[this.selectedDay][this.selectedClass].IsPresent = this.isPresent;
    }
    this.selectedDay = null;
    this.selectedClass = null;
    this.selectedSubjectId = null;
    this.selectedSubjectName = null;
    this.showPopup = false;
  }
  openPopup(dayIndex: number, colIndex: number): void {
    this.selectedDay = dayIndex;
    this.selectedClass = colIndex;
    const cell = this.timetableGrid[dayIndex][colIndex];
    this.selectedSubjectId = cell.SubjectId;
    this.selectedSubjectName = cell.SubjectName;
    this.comments = cell.Comments;
    this.isPresent = cell.IsPresent == true ? true : false

    this.showPopup = true;
  }
  setAttendance(status: boolean): void {
    this.isPresent = status;
  }
  setAttendanceRow(status: boolean): void {
    this.isRowPresent = status;
  }
  markToday(dayIndex: number): void {
    this.selectedRowDay = dayIndex;
    this.showRowPopup = true;
  }
  closePopupRow() {
    if (this.selectedRowDay !== null) {
      for (let i = 0; i < this.timetableGrid[this.selectedRowDay].length; ++i) {
        if (this.timetableGrid[this.selectedRowDay][i].SubjectId != null && this.timetableGrid[this.selectedRowDay][i].SubjectId != undefined) {
          this.timetableGrid[this.selectedRowDay][i].Comments = this.rowComment;
          this.timetableGrid[this.selectedRowDay][i].IsPresent = this.isRowPresent;
        }

      }
    }
    this.showRowPopup = false;
    this.selectedRowDay = null;
    this.rowComment = '';
    this.isRowPresent = false;
  }
}
