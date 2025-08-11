import { Routes } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { PostNewComponent } from './post-new/post-new.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'login-form', pathMatch: 'full' }, 
  { path: 'login-form', component: LoginRegisterComponent },
  { path: 'register-form', component: RegisterFormComponent },
  { path: 'post-new', component: PostNewComponent },
  { path: 'delete-form/:id', loadComponent: () => import('./delete-form/delete-form.component').then(m => m.DeleteFormComponent) },
  { path: '**', redirectTo: 'register-form' }
];
