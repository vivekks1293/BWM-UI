import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../timetable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-details',
  templateUrl: './term-details.component.html',
  styleUrls: ['./term-details.component.scss'],
  standalone: false,
})
export class TermDetailsComponent implements OnInit {
  termID: number | null = null;
  termName: string | null = null;

  constructor(private router: Router, private timetableService: TimetableService) {}

  ngOnInit(): void {
    const selectedTerm = this.timetableService.getSelectedTerm();
    this.termID = selectedTerm.termID;
    this.termName = selectedTerm.termName;
  }

  goToSubjects(): void {
    this.router.navigate(['timetable/subjects']);
  }
  
  goToTimetables(): void {
    this.router.navigate(['timetable/timetables']);
  }

  goToMarkAttendance(): void {
    this.router.navigate(['timetable/markattendence']);
  }
  goToCheckAttendance(){
    this.router.navigate(['timetable/checkattendence']);
  }
}
