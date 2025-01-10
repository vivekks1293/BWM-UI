import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';
import { TimetableService } from './Feature/time-table/timetable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BWM-UI';
  showHeader: boolean = true;
  constructor(private router: Router, private timetableService: TimetableService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = event.url !== '/login';
      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');

    this.timetableService.clearSelectedTerm();

    this.router.navigate(['/login']);
  }
}
