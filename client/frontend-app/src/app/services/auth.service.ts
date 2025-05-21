// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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

  login(formData: NgForm): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, formData.value).pipe(
      tap((response: any) => {

        const user: User = {
          userType: response.userType,  
          token: response.token || ''   
        };

        localStorage.setItem('currentUser', JSON.stringify(user));

        if (user.userType === 'startup') {
          this.router.navigate(['/startup/profile']);
        } else if (user.userType === 'vc') {
          this.router.navigate(['/']);
        }
        
      })
    );
  }

  signup(endpoint: string, formData: NgForm): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, formData.value).pipe(
      tap(res => {
        const user = { ...res };

        localStorage.setItem('user', JSON.stringify(user));
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
