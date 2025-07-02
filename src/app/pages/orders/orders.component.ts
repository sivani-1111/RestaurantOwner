import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { NgForOf, NgIf, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.html',
  styleUrls: ['./orders.css'],
  imports: [RouterLink, FormsModule, NgForOf, NgIf, TitleCasePipe]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  statuses = ["Pending", "Accepted", "Preparing", "Delivered"];
  error = '';

  // Toast state
  toastMessage = '';
  showToast = false;

  constructor(private router: Router, private orderService: OrderService) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.orderService.getAll().subscribe({
      next: data => this.orders = data,
      error: err => this.error = 'Failed to load orders'
    });
  }

  updateStatus(orderId: number, status: string) {
    this.orderService.updateStatus(orderId, status).subscribe({
      next: () => {
        this.load();
        this.showToastMessage('Order status has been updated.');
      },
      error: () => this.error = 'Could not update status'
    });
  }

  showToastMessage(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2000); // Toast disappears after 2 seconds
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}