import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  isLoginMode = true;

  loginData = { email: '', password: '' };
  registerData = { name: '', email: '', password: '', confirmPassword: '' };
  resetData: any;
  isResetPassword: boolean | undefined;

  constructor(private router: Router) {}

  switchMode(isLogin: boolean) {
    this.isLoginMode = isLogin;
  }

  private markFormControlsTouched(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }

onLogin(form: NgForm) {
  if (!form.valid) {
    Object.values(form.controls).forEach(c => c.markAsTouched());
    alert('Please fill in all required fields correctly.');
    return;
  }
  this.router.navigate(['/register-form']);
}

onRegister(form: NgForm) {
  if (!form.valid) {
    Object.values(form.controls).forEach(c => c.markAsTouched());
    alert('Please fill in all required fields correctly.');
    return;
  }
  if (this.registerData.password !== this.registerData.confirmPassword) {
    form.controls['confirmPassword']?.markAsTouched();
    alert('Passwords do not match!');
    return;
  }
  this.router.navigate(['/register-form']);
}

 openResetPassword() {
    this.isResetPassword = true;
  }

  backToLogin() {
    this.isResetPassword = false;
    this.isLoginMode = true;
  }

    onResetPassword(form: NgForm) {
    if (!form.valid) return;
    // reset password logic here
    alert('Reset link sent to ' + this.resetData.email);
    this.backToLogin();
  }
}
