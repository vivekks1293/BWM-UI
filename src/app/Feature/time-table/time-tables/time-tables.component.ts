import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-timetables',
  standalone: false,
  templateUrl: './time-tables.component.html',
  styleUrls: ['./time-tables.component.scss'],
})
export class TimetablesComponent implements OnInit {
  timetables: any[] = [];
  showPopup = false;
  editingTimetable = false;
  newTimetable = { time_table_id: null, time_table_Name: '', no_of_day_per_week: 0, no_of_class_per_day: 0 };
  termID: number | null = null;
  termName: string | null = null;

  constructor(private timetableService: TimetableService, private router: Router) {}

  ngOnInit(): void {
    const selectedTerm = this.timetableService.getSelectedTerm();
    this.termID = selectedTerm.termID;
    this.termName = selectedTerm.termName;

    this.fetchTimetables();
  }

  fetchTimetables() {
    if (this.termID) {
      this.timetableService.getTimetables(this.termID).subscribe((response: any) => {
        if (response.success) {
          this.timetables = response.timetables;
          for(let i = 0; i < this.timetables.length; ++i){
            if(this.timetables[i].Is_Selected == 1){
              this.timetables[i].isChecked = true;
            }
            else{
              this.timetables[i].isChecked = false;
            }
          }
        }
      });
    }
  }

  openPopup(timetable?: any) {
    this.showPopup = true;

    if (timetable) {
      this.editingTimetable = true;
      this.newTimetable = { ...timetable };
    } else {
      this.editingTimetable = false;
      this.newTimetable = { time_table_id: null, time_table_Name: '', no_of_day_per_week: 0, no_of_class_per_day: 0 };
    }
  }

  closePopup() {
    this.showPopup = false;
    this.newTimetable = { time_table_id: null, time_table_Name: '', no_of_day_per_week: 0, no_of_class_per_day: 0 };
  }

  addTimetable() {
    const timetable = { ...this.newTimetable, termId: this.termID };

    this.timetableService.addTimetable(timetable).subscribe((response: any) => {
      if (response.success) {
        this.fetchTimetables();
        this.closePopup();
      }
    });
  }

  updateTimetable() {
    this.timetableService.updateTimetable(this.newTimetable).subscribe((response: any) => {
      if (response.success) {
        this.fetchTimetables();
        this.closePopup();
      }
    });
  }

  goBack() {
    this.router.navigate(['timetable/termdetails']);
  }

  selectTimetable(time_table_id: number) {
    if (this.termID) {
      this.timetableService.selectTimetable({ time_table_id, termId: this.termID }).subscribe((response: any) => {
        if (response.success) {
          this.fetchTimetables();
        }
      });
    }
  }

  viewTimetable(timetableId: number) {
    this.router.navigate(['timetable/timetabledetails', timetableId]);
  }
}
