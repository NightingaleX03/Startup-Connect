import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AuthComponent {
  // --- Tabs & States ---
  activeTab: 'login' | 'signup' = 'login';
  signupType: 'startup' | 'vc' | null = null;

  errorMessage: string = '';
  signupError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  switchTab(tab: 'login' | 'signup'): void {
    this.activeTab = tab;
    this.errorMessage = '';
    this.signupError = '';
    this.signupType = null;
  }

  onSubmitLogin(form: NgForm): void {
    this.errorMessage = '';

    this.authService.login(form).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });
  }

  onSubmitSignup(form: NgForm, userType: 'startup' | 'vc'): void {
    this.signupError = '';

    const { password, repassword } = form.value;
    if (password !== repassword) {
      this.signupError = 'Passwords do not match.';
      return;
    } else {
      
    }

    // Adjust endpoint based on userType
    const endpoint = userType === 'startup' ? 'signup/startup' : 'signup/vc';

    this.authService.signup(endpoint, form).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: err => {
        this.signupError = err.error.message || `Signup as ${userType} failed.`;
        console.error(err);
      }
    });
  }

}
