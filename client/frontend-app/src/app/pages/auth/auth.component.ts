import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AuthComponent {
  activeTab: 'login' | 'signup' = 'login';
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  // Signup logic
  signupType: 'startup' | 'vc' | null = null;
  signupError: string = '';

  // Startup signup fields
  startupName: string = '';
  email: string = '';
  telephone: string = '';
  size: string = '';
  repassword: string = '';

  // VC signup fields
  vcName: string = '';
  vcEmail: string = '';
  vcTelephone: string = '';
  vcPassword: string = '';
  vcRepassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  switchTab(tab: 'login' | 'signup'): void {
    this.activeTab = tab;
    this.errorMessage = '';
    this.signupType = null;
    this.signupError = '';
  }

  onSubmit(): void {
    this.errorMessage = '';
    // if (this.activeTab === 'login') {
    //   if (this.authService.login(this.username, this.password)) {
    //     // Redirection is now handled by the auth service
    //   } else {
    //     this.errorMessage = 'Invalid credentials';
    //   }
    // }
      this.authService.loginAuth(this.username, this.password).subscribe({
        next: (res) => {
          console.log('✅', res.message);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      });
  }

  onSubmitStartup(): void {
    this.signupError = '';
    if (this.password !== this.repassword) {
      this.signupError = 'Passwords do not match.';
      return;
    }
    // Simulate signup logic (replace with real API call)
    // For now, just log in as startup
    if (this.authService.login(this.username, this.password)) {
      // Redirection is now handled by the auth service
    } else {
      this.signupError = 'Signup as startup is not implemented.';
    }
  }

  onSubmitVC(): void {
    this.signupError = '';
    if (this.vcPassword !== this.vcRepassword) {
      this.signupError = 'Passwords do not match.';
      return;
    }
    // Simulate signup logic (replace with real API call)
    // For now, just log in as VC
    if (this.authService.login(this.vcName, this.vcPassword)) {
      // Redirection is now handled by the auth service
    } else {
      this.signupError = 'Signup as VC is not implemented.';
    }
  }
} 