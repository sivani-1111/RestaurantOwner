import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getMenu() {
    return JSON.parse(localStorage.getItem('menu') || '[]');
  }
  setMenu(menu: any[]) {
    localStorage.setItem('menu', JSON.stringify(menu));
  }
  getOrders() {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  }
  setOrders(orders: any[]) {
    localStorage.setItem('orders', JSON.stringify(orders));
  }
}