import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  activeRoute: string = '';
    @Input() collapsed: boolean = false;
    
sidebarCollapsed = false;

toggleSidebar() {
  this.sidebarCollapsed = !this.sidebarCollapsed;
  this.collapsed = !this.collapsed;
}


  constructor(private router: Router) {
  }
  ngOnInit() {
  this.router.events.subscribe(() => {
    this.activeRoute = this.router.url;
  });
}

  menuItems = [
    {label: 'Register Form',path: '/register-form',  icon: 'bi bi-journal-plus'},
    {label: '',path: '/id-form'},
     {label: 'Add new ',path: '/post-new', icon: 'bi bi-plus-circle'},
    {label: '',path: '/delete-form' }
  ];

  setActive(path: string): void {
    this.activeRoute = path;
  }
}
