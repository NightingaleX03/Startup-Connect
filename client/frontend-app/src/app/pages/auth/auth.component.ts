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

  currentYear = new Date().getFullYear();

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
        const user = {
          username: res.username,
          userType: res.userType,
          token: res.token || ''
        };
        this.router.navigate(['/dashboard', user.username]);
       
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
        this.switchTab('login');
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Login failed';
      }
    });

  }

}
