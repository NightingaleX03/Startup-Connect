// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
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
