import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  searchTerm = '';
  spa: any[] = [];
  filteredSpa: any[] = [];

  viewItem: any = null;
  showEditModal = false;

  id = '';
  result: any = null;
  loading = false;
  successMessage = '';
  errorMessage = '';
  isEditMode = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any[]>('https://app-spa-madurai-dev-001-fweceqhadgbvfgha.centralus-01.azurewebsites.net/api/Item')
      .subscribe(data => {
        this.spa = data;
        this.filteredSpa = data;
      });
  }

  onSearch() {
    this.filteredSpa = this.spa.filter(item =>
      item.productName?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // View modal
  openViewModal(item: any) {
    this.viewItem = item;
  }

  closeViewModal() {
    this.viewItem = null;
  }

  // Edit / Add modal
  openEditModal(itemId: string = '') {
    this.successMessage = '';
    this.errorMessage = '';
    this.id = itemId;
    this.showEditModal = true;

    if (itemId) {
      this.isEditMode = true;
      this.getById();
    } else {
      this.isEditMode = false;
      this.result = {
        productName: '',
        sku: '',
        hsn_SAC: '',
        categoryId: '',
        unitId: '',
        minQty: 0,
        expiryAlertDays: 0,
        description: '',
        sellingPrice: 0,
        sgst: 0,
        cgst: 0
      };
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.result = null;
    this.id = '';
    this.successMessage = '';
    this.errorMessage = '';
    this.isEditMode = false;
  }

  getById(): void {
    if (!this.id) {
      alert("Please enter a Product ID");
      return;
    }

    this.loading = true;
    const url = `https://app-spa-madurai-dev-001-fweceqhadgbvfgha.centralus-01.azurewebsites.net/api/Item/${this.id}`;
    this.http.get(url).subscribe({
      next: (data: any) => {
        this.result = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'ID not found';
        this.loading = false;
      }
    });
  }

  updateProduct(): void {
    if (!this.result) return;

    if (this.isEditMode) {
      const url = `https://app-spa-madurai-dev-001-fweceqhadgbvfgha.centralus-01.azurewebsites.net/api/Item/${this.id}`;
      this.http.put(url, this.result).subscribe({
        next: () => {
          this.successMessage = 'Product updated!';
          setTimeout(() => {
            this.successMessage = '';
            this.closeEditModal();
            this.fetchData();
          }, 1500);
        },
        error: () => {
          this.errorMessage = 'Failed to update product.';
        }
      });
    } else {
      // POST request
      const url = `https://app-spa-madurai-dev-001-fweceqhadgbvfgha.centralus-01.azurewebsites.net/api/Item`;
      this.http.post(url, this.result).subscribe({
        next: () => {
          this.successMessage = 'Product added!';
          setTimeout(() => {
            this.successMessage = '';
            this.closeEditModal();
            this.fetchData();
          }, 1500);
        },
        error: () => {
          this.errorMessage = 'Failed to add product.';
        }
      });
    }
  }

  // Delete
  onDelete(itemId: string) {
    this.router.navigate(['/delete-form', itemId]);
  }
}
