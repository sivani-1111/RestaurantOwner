import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [RouterLink]
})
export class DashboardComponent {
  constructor(private router: Router) {
    if (!localStorage.getItem('loggedIn')) {
      this.router.navigate(['/login']);
    }
  }
  logout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }
}