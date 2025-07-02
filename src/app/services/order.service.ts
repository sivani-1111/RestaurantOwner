import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UpdateOrderDto {
  status: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:5153/api/Order';

  constructor(private http: HttpClient) {}

  // You may need to add this endpoint in backend:
  // [HttpGet("restaurant")] [Authorize(Roles = "RestaurantOwner")]
  // public async Task<IActionResult> GetForOwner() { ... }
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/restaurant`);
  }

  updateStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/status`, { status });
  }
}