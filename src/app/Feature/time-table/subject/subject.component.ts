import { Component } from '@angular/core';
import { TimetableService } from '../timetable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  standalone: false,
  
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.scss'
})
export class SubjectComponent {
  subjects: any[] = [];
  showPopup = false;
  editingSubject = false;
  newSubject = { subjectId: null, subject_Name: '', subject_Faculty: '', subject_Description: '' };
  termID: number | null = null;
  termName: string | null = null;

  constructor(private timetableService: TimetableService, private router: Router,) {}

  ngOnInit(): void {
    const selectedTerm = this.timetableService.getSelectedTerm();
    this.termID = selectedTerm.termID;
    this.termName = selectedTerm.termName;

    this.fetchSubjects();
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

  openPopup(subject?: any) {
    this.showPopup = true;

    if (subject) {
      this.editingSubject = true;
      this.newSubject = { ...subject };
    } else {
      this.editingSubject = false;
      this.newSubject = { subjectId: null, subject_Name: '', subject_Faculty: '', subject_Description: '' };
    }
  }

  closePopup() {
    this.showPopup = false;
    this.newSubject = { subjectId: null, subject_Name: '', subject_Faculty: '', subject_Description: '' };
  }

  addSubject() {
    const subject = { ...this.newSubject, termId: this.termID };

    this.timetableService.addSubject(subject).subscribe((response: any) => {
      if (response.success) {
        this.fetchSubjects();
        this.closePopup();
      }
    });
  }

  updateSubject() {
    this.timetableService.updateSubject(this.newSubject).subscribe((response: any) => {
      if (response.success) {
        this.fetchSubjects();
        this.closePopup();
      }
    });
  }
  goBack() {
    this.router.navigate(['timetable/termdetails']);
  }
}
