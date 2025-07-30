import { Routes } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { PostNewComponent } from './post-new/post-new.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register-form', pathMatch: 'full' },
  { path: 'register-form', component: RegisterFormComponent },
  { path: 'post-new', component: PostNewComponent },
  { path: 'delete-form/:id', loadComponent: () => import('./delete-form/delete-form.component').then(m => m.DeleteFormComponent) },
  { path: '**', redirectTo: 'register-form' }
];
