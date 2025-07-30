import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './delete-form.component.html',
  styleUrl: './delete-form.component.css'
})
export class DeleteFormComponent implements OnInit {
  itemId: number | null = null;
  successMessage = '';
  errorMessage = '';
  isDeleting = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.itemId = param ? +param : null;

    if (this.itemId) {
      this.deleteItem();
    }
  }

  deleteItem() {
    if (this.isDeleting || !this.itemId) {
      return;
    }

    const idToDelete = this.itemId;
    this.isDeleting = true;
    this.itemId = null;

    const url = `https://app-spa-madurai-dev-001-fweceqhadgbvfgha.centralus-01.azurewebsites.net/api/Item/${idToDelete}`;

    this.http.delete(url).subscribe({
      next: () => {
        this.successMessage = `Item with ID ${idToDelete} deleted successfully!`;
        this.errorMessage = '';
        this.isDeleting = false;

        setTimeout(() => {
          this.router.navigate(['/register-form']); 
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = `Failed to delete item with ID ${idToDelete}. It may not exist.`;
        this.successMessage = '';
        console.error(err);
        this.isDeleting = false;
      }
    });
  }
}
