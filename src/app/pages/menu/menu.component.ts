
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Component({
  standalone: true,
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
  imports: [RouterLink, CommonModule, FormsModule]
})
export class MenuComponent implements OnInit {
  menu: any[] = [];
  itemID: number | null = null;
  itemName = '';
  itemDescription = '';
  itemPrice: number | null = null;
  selectedImage: File | null = null;
  error = '';
  isEditing = false;

  constructor(private router: Router, private menuService: MenuService) {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.menuService.getAll().subscribe({
      next: data => {
        this.menu = data;
      },
      error: err => {
        this.error = 'Failed to load menu';
      }
    });
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImage = fileInput.files[0];
    }
  }

  submitItem() {
    if (this.itemName.trim() && this.itemPrice != null && this.itemPrice >= 0) {
      const token = localStorage.getItem('token');
      let restaurantName = '';

      if (token) {
        const decodedToken: any = jwtDecode(token);
        restaurantName = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || '';
      }

      const formData = new FormData();
      formData.append('Name', this.itemName);
      formData.append('Price', this.itemPrice.toString());
      formData.append('Description', this.itemDescription);
      formData.append('RestaurantName', restaurantName);
      if (this.selectedImage) {
        formData.append('Image', this.selectedImage);
      }

      if (this.isEditing && this.itemID != null) {
        this.menuService.update(this.itemID, formData).subscribe({
          next: () => {
            this.resetForm();
            this.load();
          },
          error: () => {
            this.error = 'Could not update item';
          }
        });
      } else {
        this.menuService.create(formData).subscribe({
          next: () => {
            this.resetForm();
            this.load();
          },
          error: () => {
            this.error = 'Could not add item';
          }
        });
      }
    }
  }

  editItem(item: any) {
    this.itemID = item.itemID;
    this.itemName = item.name;
    this.itemDescription = item.description;
    this.itemPrice = item.price;
    this.isEditing = true;
  }

  resetForm() {
    this.itemID = null;
    this.itemName = '';
    this.itemDescription = '';
    this.itemPrice = null;
    this.selectedImage = null;
    this.isEditing = false;
    this.error = '';
  }

  removeItem(id: number) {
    this.menuService.delete(id).subscribe({
      next: () => this.load(),
      error: () => this.error = 'Could not delete item'
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
