import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginModel, SignupModel } from './auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AuthComponent {

  activeTab: 'login' | 'signup' = 'login';

  errorMessage: string = '';
  signupError: string = '';

  login: LoginModel = {
    name: '',
    password: ''
  };

  signup: SignupModel = {
    name: '',
    type: 'startup', 
    email: '',
    phone: '',
    password: ''
  };
  repassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  switchTab(tab: 'login' | 'signup'): void {
    this.activeTab = tab;
    this.errorMessage = '';
    this.signupError = '';
  }

  onSubmitLogin(): void {
    this.errorMessage = '';

    this.authService.login(this.login).subscribe({
      next: (res) => {
        if (res.userType === 'startup') {
          this.router.navigate(['/startup/profile']);
        } else if (res.userType === 'vc') {
          this.router.navigate(['/startup/profile']);
        } else {
          this.router.navigate(['/startup/profile']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });
  }

  onSubmitSignup(): void {
    this.signupError = '';

    if (this.signup.password !== this.repassword) {
      this.signupError = 'Passwords do not match.';
      return;
    } 

    // Adjust endpoint based on userType
    const endpoint = this.signup.type === 'startup' ? 'signup/startup' : 'signup/vc';

    this.authService.signup(endpoint, this.signup).subscribe({
      next: (res) => { 
        this.router.navigate(['/']);  
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });

  }

}
