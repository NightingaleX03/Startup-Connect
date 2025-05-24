import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginModel, SignupModel, UserType } from './auth.model';

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
    type: UserType.Startup, 
    email: '',
    phone: '',
    password: ''
  };
  UserType = UserType;
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

    this.authService.signup(this.signup).subscribe({
      next: (res) => { 
        this.router.navigate(['/']);  
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });

  }

}
