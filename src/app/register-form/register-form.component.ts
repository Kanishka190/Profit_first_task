import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from "../components/sidebar/sidebar.component";
import { HeaderComponent } from "../components/header/header.component";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent, HeaderComponent],
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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchData();
  }

sidebarCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
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
  printItemDetails(item: any) {
    const printWindow = window.open('', '', 'width=1000,height=700');
    if (printWindow) {
      printWindow.document.write(`
      <html>
      <head>
        <title>Item Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f9f9f9;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .invoice-header {
            display: flex;
            align-items: center;
            border-bottom: 2px solid #ccc;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .invoice-logo {
            width: 80px;
            height: auto;
            margin-right: 20px;
          }
          .invoice-hospital-details h2 {
            margin: 0;
            color: #008080;
          }
          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          .invoice-table th, .invoice-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
          }
          .invoice-table th {
            background-color: #008080;
            color: white;
          }
          .invoice-footer {
            margin-top: 30px;
            text-align: center;
            font-style: italic;
            color: #008080;
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <img src="purush.jpeg" alt="Logo" class="invoice-logo" />
          <div class="invoice-hospital-details">
            <h2>ABC Technologies</h2>
            <p>Medicine Details</p>
          </div>
        </div>

        <table class="invoice-table">
          <tr><th>Item ID</th><td>${item.itemId}</td></tr>
          <tr><th>Product Name</th><td>${item.productName}</td></tr>
          <tr><th>SKU</th><td>${item.sku}</td></tr>
          <tr><th>HSN/SAC</th><td>${item.hsN_SAC}</td></tr>
          <tr><th>Category</th><td>${item.category}</td></tr>
          <tr><th>Unit</th><td>${item.unit}</td></tr>
          <tr><th>Min Qty</th><td>${item.minQty}</td></tr>
          <tr><th>Expiry Alert Days</th><td>${item.expiryAlertDays}</td></tr>
          <tr><th>Description</th><td>${item.description}</td></tr>
          <tr><th>Selling Price</th><td>₹${item.sellingPrice}</td></tr>
        </table>

        <div class="invoice-footer">
          Powered by ABC Technologies — Where trust meets technology.
        </div>
      </body>
      </html>
    `);

      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      // printWindow.close(); // Optional, close after print
    }
  }


}
