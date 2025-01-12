import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimetableService } from '../../Feature/time-table/timetable.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  username: string | null = '';
  user: any;

  constructor(private router: Router,  private timetableService: TimetableService) {}

  ngOnInit(): void {
    let user = sessionStorage.getItem('user');
    if(user != undefined && user != null){
      this.user = JSON.parse(user);
      this.username = this.user.first_name + " " + this.user.last_name
    }
  }

  logout(): void {
    sessionStorage.removeItem('user');

    this.timetableService.clearSelectedTerm();

    this.router.navigate(['/login']);
  }
}
