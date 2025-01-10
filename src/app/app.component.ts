import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TimetableService } from './Feature/time-table/timetable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BWM-UI';
  constructor(private router: Router, private timetableService: TimetableService) {}

  logout(): void {
    // Clear user data from localStorage
    localStorage.removeItem('user');

    // Clear term data from BehaviorSubject
    this.timetableService.clearSelectedTerm();

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
