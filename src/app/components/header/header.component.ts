import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router) {}
    @Input() collapsed = false;

    @Output() toggle = new EventEmitter<void>();

onHamburgerClick() {
  this.toggle.emit();
}

  logout() {
   const confirmed = confirm("Are you sure you want to close/logout?");
    if (confirmed) {
      this.router.navigate(['/login-form']);
    }
  }
}
