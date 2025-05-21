// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface User {
  userType: 'startup' | 'vc' | null;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private baseUrl = 'http://localhost:5000/users';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  loginAuth(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  login(username: string, password: string): boolean {
    let user: User | null = null;
    
    if (username === 'a' && password === 'a') {
      user = { userType: 'startup', token: 'abc' };
    } else if (username === 'b' && password === 'b') {
      user = { userType: 'vc', token: 'xyz' };
    }

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      
      // Redirect based on user type
      if (user.userType === 'startup') {
        this.router.navigate(['/startup/profile']);
      } else if (user.userType === 'vc') {
        this.router.navigate(['/']);
      }
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getUserType(): 'startup' | 'vc' | null {
    return this.currentUserSubject.value?.userType || null;
  }
}
