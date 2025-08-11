import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../components/header/header.component";
import { SidebarComponent } from "../components/sidebar/sidebar.component";

@Component({
  selector: 'app-post-new',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, SidebarComponent],
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent {
  item = {
    itemId: 0,
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

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  sidebarOpen = true;

toggleSidebar() {
  this.sidebarOpen = !this.sidebarOpen;
}


  OnSubmit() {
    const url = `https://app-spa-madurai-dev-001-fweceqhadgbvfgha.centralus-01.azurewebsites.net/api/Item`;

    this.http.post(url, this.item).subscribe({
      next: (res) => {
        this.successMessage = 'Product successfully submitted';
        this.errorMessage = '';
        console.log(res);
      },
      error: (err) => {
        this.errorMessage = 'Error submitting product';
        this.successMessage = '';
        console.error(err);
      }
    });
  }
}
