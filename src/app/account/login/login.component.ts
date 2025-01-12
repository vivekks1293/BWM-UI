import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  message = '';
  user: any = null;
  // testuser, jane_doe / password123
  constructor(private http: HttpClient, private router: Router) {}

  login() {
      this.http.post('http://localhost:3000/login', {
          username: this.username,
          password: this.password
      }).subscribe((response: any) => {
          if(response.success == true){
            this.user = response.user;
            sessionStorage.setItem('user', JSON.stringify({
              id: this.user.id,
              username: this.user.username,
              first_name: this.user.first_name,
              last_name: this.user.last_name,
              email: this.user.email, // Assuming the email column is added in your backend
            }));
            this.router.navigate(['/timetable']);
          }
          this.message = response.message;
      });
  }
}
