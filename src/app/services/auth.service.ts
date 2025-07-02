import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5153/api/Auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
      email: data.email,
      password: data.password,
      role: 'RestaurantOwner'
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    console.log('Token stored in localStorage:', token); // Added logging
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
