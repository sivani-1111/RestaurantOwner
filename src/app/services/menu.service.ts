
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private apiUrl = 'http://localhost:5153/api/MenuItem';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/restaurant`);
  }

  create(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  update(itemId: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${itemId}`, data);
  }

  delete(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }
}
