import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  terms: any[] = [];
  showPopup = false;
  newTerm = { termID: null, Term_Name: '', Term_Duration: null };
  userId: number = 0;
  editingTerm = false;

  constructor(private timetableService: TimetableService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.userId = user.id;

    this.fetchTerms();
  }

  openPopup(term?: any) {
    this.showPopup = true;

    if (term) {
      this.editingTerm = true;
      this.newTerm = { ...term };
    } else {
      this.editingTerm = false;
      this.newTerm = { termID: null, Term_Name: '', Term_Duration: null };
    }
  }

  closePopup() {
    this.showPopup = false;
    this.newTerm = { termID: null, Term_Name: '', Term_Duration: null };
  }

  addTerm() {
    const term = { ...this.newTerm, userId: this.userId };

    this.timetableService.addTerm(term).subscribe((response: any) => {
      if (response.success) {
        this.fetchTerms();
        this.closePopup();
      }
    });
  }

  updateTerm() {
    this.timetableService.updateTerm(this.newTerm).subscribe((response: any) => {
      if (response.success) {
        this.fetchTerms();
        this.closePopup();
      }
    });
  }

  fetchTerms() {
    this.timetableService.getTerms(this.userId).subscribe((response: any) => {
      if (response.success) {
        this.terms = response.terms;
      }
    });
  }

  viewTerm(term: any) {
    this.timetableService.setSelectedTerm(term.termID, term.Term_Name); // Store termID and termName
    this.router.navigate(['timetable/termdetails']); // Redirect to SubjectComponent
  }
}
