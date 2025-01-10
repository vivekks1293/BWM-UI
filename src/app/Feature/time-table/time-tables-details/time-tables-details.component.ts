import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TimetableService } from '../timetable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-tables-details',
  standalone: false,
  
  templateUrl: './time-tables-details.component.html',
  styleUrl: './time-tables-details.component.scss'
})
export class TimeTablesDetailsComponent {
  timetableId: number | null = null;
  timetableDetails: any = null;
  days: string[] = [];
  columns: number[] = [];
  timetableGrid: any[][] = []; // 2D array for timetable grid
  showPopup = false;
  selectedDay: number | null = null;
  selectedClass: number | null = null;
  termID: number | null = null;
  subjects: any[] = [];
  selectedSubjectId: number | null = null; 
  selectedSubjectName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timetableService: TimetableService
  ) {}

  ngOnInit(): void {
    this.timetableId = Number(this.route.snapshot.paramMap.get('id'));
    const selectedTerm = this.timetableService.getSelectedTerm();
    this.termID = selectedTerm.termID;
    this.fetchSubjects();
    if (this.timetableId) {
      this.timetableService.getTimetableDetails(this.timetableId).subscribe((response: any) => {
        if (response.success) {
          this.timetableDetails = response.timetable;

          // Generate rows (days of the week)
          this.days = Array.from({ length: this.timetableDetails.no_of_day_per_week }, (_, i) =>
            ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]
          );

          this.columns = Array.from({ length: this.timetableDetails.no_of_class_per_day }, (_, i) => i + 1);

          if (this.timetableDetails.Time_Table_Data) {
            this.timetableGrid = JSON.parse(this.timetableDetails.Time_Table_Data);
          } else {
            this.timetableGrid = Array.from({ length: this.timetableDetails.no_of_day_per_week }, () =>
              Array.from({ length: this.timetableDetails.no_of_class_per_day }, () => ({
                SubjectId: null,
                SubjectName: "No Class",
              }))
            );
          }
        }
      });
    }
  }

  openPopup(dayIndex: number, colIndex: number): void {
    this.selectedDay = dayIndex;
    this.selectedClass = colIndex;
    const cell = this.timetableGrid[dayIndex][colIndex];
    this.selectedSubjectId = cell.SubjectId;
    this.selectedSubjectName = cell.SubjectName;

    this.showPopup = true;
  }

  closePopup(): void {
    this.selectedDay = null;
    this.selectedClass = null;
    this.selectedSubjectId = null;
    this.selectedSubjectName = null;
    this.showPopup = false;
  }

  updateSubjectForCell(): void {
    if (this.selectedDay !== null && this.selectedClass !== null) {
      // Find the selected subject name from the dropdown
      const selectedSubject = this.subjects.find((sub) => sub.subjectId == this.selectedSubjectId);

      // Update the 2D array
      this.timetableGrid[this.selectedDay][this.selectedClass] = {
        SubjectId: this.selectedSubjectId,
        SubjectName: selectedSubject ? selectedSubject.subject_Name : "No Class",
      };

      // Update the selected subject name
      this.selectedSubjectName = selectedSubject ? selectedSubject.subject_Name : "No Class";

      console.log('Updated Timetable Grid:', this.timetableGrid);
    }
  }

  saveTimetable(): void {
    if (this.timetableId) {
      const timeTableDataString = JSON.stringify(this.timetableGrid);
  
      const payload = {
        time_table_id: this.timetableId,
        time_table_data: timeTableDataString,
      };
  
      this.timetableService.updateTimetableData(payload).subscribe((response: any) => {
        if (response.success) {
          alert('Timetable data saved successfully!');
        } else {
          alert('Error saving timetable data!');
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

  goBack(): void {
    this.router.navigate(['/timetables']); // Navigate back to Timetables list
  }
}
