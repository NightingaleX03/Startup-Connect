// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { LoginModel, SignupModel } from '../pages/auth/auth.model';

export interface User {
  userType: 'startup' | 'vc' | null;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5000/auth';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {

  }

  login(user: LoginModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, user).pipe(
      tap((response: any) => {

        const user: User = {
          userType: response.userType,  
          token: response.token || ''   
        };

        localStorage.setItem('currentUser', JSON.stringify(user));
        
      })
    );
  }

  signup(user: SignupModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user).pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res));
      })

    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getUserType(): 'startup' | 'vc' | null {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user.userType || null;
  }
}
