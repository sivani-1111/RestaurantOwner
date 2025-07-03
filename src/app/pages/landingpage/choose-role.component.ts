import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-role',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './choose-role.html',
  styleUrls: ['./choose-role.css']
})
export class ChooseRoleComponent {
  redirectTo(role: string): void {
    if (role === 'user') {
      window.location.href = 'http://localhost:4200/login';
    } else if (role === 'owner') {
      window.location.href = '/owner';
    }
  }
}
