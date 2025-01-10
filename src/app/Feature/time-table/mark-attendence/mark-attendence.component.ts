import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../timetable.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mark-attendence',
  standalone: false,

  templateUrl: './mark-attendence.component.html',
  styleUrl: './mark-attendence.component.scss'
})
export class MarkAttendenceComponent {
  activeTimetableId: number | null = null;
  activeTimetableName: string | null = null;
  timetableData: any[][] | null = null;
  attendanceRecords: any[] = [];
  showPopup = false;
  selectedDate: string | null = null;
  selectedDateToFormat: string | null = null;
  termId: number | null = null;
  editingRecord: any = null;

  constructor(private router: Router, private timetableService: TimetableService) { }

  ngOnInit(): void {
    const selectedTerm = this.timetableService.getSelectedTerm();
    this.termId = selectedTerm.termID;
    this.fetchActiveTimetable(selectedTerm.termID);
    this.fetchAttendanceRecords(this.termId);
  }

  fetchActiveTimetable(termId: any): void {
    this.timetableService.getActiveTimetable(termId).subscribe((response: any) => {
      if (response.success) {
        this.activeTimetableId = response.timetable.time_table_id;
        this.activeTimetableName = response.timetable.time_table_Name;
        this.timetableData = response.timetable.Time_Table_Data
          ? JSON.parse(response.timetable.Time_Table_Data)
          : null;
      } else {
        this.activeTimetableId = null;
        this.activeTimetableName = 'No active timetable found for this term.';
        this.timetableData = null;
      }
    });
  }

  fetchAttendanceRecords(termId: any): void {
    this.timetableService.getMarkAttendance(termId).subscribe((response: any) => {
      if (response.success) {
        this.attendanceRecords = response.timetable.attendanceRecords.map((record: any) => {
          // Convert date to dd/mm/yyyy format
          const date = new Date(record.Date);
          const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(
            date.getMonth() + 1
          ).padStart(2, '0')}/${date.getFullYear()}`;
          return { ...record, formattedDate };
        });
      }
    });
  }

  editAttendance(attendenceId: number): void {
    alert(`Edit attendance ID: ${attendenceId}`);
  }

  viewAttendance(attendenceId: number): void {
    alert(`View attendance ID: ${attendenceId}`);
  }

  deleteAttendance(attendenceId: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.timetableService.deleteMarkAttendance(attendenceId).subscribe((response: any) => {
        if (response.success) {
          alert('Attendance record deleted successfully!');
          this.fetchAttendanceRecords(this.termId!); // Refresh attendance records
        }
      });
    }
  }

  openPopup(record: any = null): void {
    if (record) {
      this.editingRecord = record;
      this.selectedDate = record.Date;
      this.selectedDateToFormat = (new Date(new Date(record.Date).getTime() - new Date().getTimezoneOffset() * 60000)).toISOString().split('T')[0];
    } else {
      this.editingRecord = null;
      this.selectedDate = null;
      this.selectedDateToFormat = null;
    }
    this.showPopup = true;
  }

  closePopup(): void {
    this.selectedDate = null;
    this.editingRecord = null;
    this.showPopup = false;
  }

  onDateChange(e: any) {
    const inputElement = e.target as HTMLInputElement;
    this.selectedDate = inputElement.value
  }

  submitAttendance(): void {
    if (!this.selectedDate || !this.termId) {
      alert('Please select a date.');
      return;
    }

    if (this.editingRecord) {
      // Update existing record
      this.timetableService
        .updateMarkAttendance(this.editingRecord.AttendenceId, { date: this.selectedDate })
        .subscribe((response: any) => {
          if (response.success) {
            alert('Attendance record updated successfully!');
            this.fetchAttendanceRecords(this.termId);
            this.closePopup();
          }
        });
    } else {
      // Add new record
      if (!this.activeTimetableId) {
        alert('No active timetable selected.');
        return;
      }
      const payload = {
        termId: this.termId,
        date: this.selectedDate,
        timeTableId: this.activeTimetableId,
      };

      this.timetableService.addMarkAttendance(payload).subscribe((response: any) => {
        if (response.success) {
          alert('Attendance record added successfully!');
          this.fetchAttendanceRecords(this.termId);
          this.closePopup();
        }
      });
    }
  }

  markAttendance(record: any): void {
    this.router.navigate(['timetable/attendencedetails', record.AttendenceId]);
  }

  goBack() {
    this.router.navigate(['timetable/termdetails']);
  }

}
