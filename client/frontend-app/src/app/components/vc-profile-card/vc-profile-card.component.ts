import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vc-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vc-profile-card">
      <div class="top-row">
        <img [src]="profile.avatar" alt="Profile Picture" class="avatar" />
        <div class="profile-info">
          <h2 class="vc-name">{{ profile.name }}</h2>
          <div class="info-row">
            <span class="plain-info">{{ profile.location }}</span>
            <span class="plain-info">Portfolio: {{ profile.portfolio_size }}</span>
          </div>
          <div class="pill primary-pill">Investment Range: <span class="white">{{ profile.investment_range }}</span></div>
        </div>
      </div>
      <div class="tags-row centered-tags">
        <span *ngFor="let area of profile.focus_areas" class="tag-pill">{{ area }}</span>
      </div>
      <div class="pill description">{{ profile.description }}</div>
      <div class="icon-row less-gap">
        <button *ngIf="profile.linkedin" class="icon-btn" (click)="onIconClick('linkedin')" aria-label="LinkedIn">
          <span class="l-icon">L</span>
        </button>
        <button *ngIf="profile.email" class="icon-btn" (click)="onIconClick('email')" aria-label="Email">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .vc-profile-card {
      background: var(--background-color);
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 16px rgba(106, 90, 205, 0.08);
    }

    .top-row {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 1rem;
    }

    .avatar {
      width: 120px;
      height: 120px;
      border-radius: 12px;
      object-fit: cover;
    }

    .profile-info {
      flex: 1;
    }

    .vc-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--text-color);
      margin-bottom: 0.5rem;
    }

    .info-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 0.5rem;
    }

    .plain-info {
      color: var(--text-color);
      opacity: 0.8;
    }

    .pill {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .primary-pill {
      background: var(--primary-color);
      color: white;
    }

    .description {
      background: var(--secondary-color);
      color: var(--text-color);
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
      line-height: 1.5;
    }

    .tags-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 1rem 0;
    }

    .tag-pill {
      background: var(--accent-color);
      color: var(--text-color);
      padding: 0.3rem 0.8rem;
      border-radius: 16px;
      font-size: 0.8rem;
    }

    .icon-row {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .icon-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: background-color 0.2s;
      color: var(--text-color);
    }

    .icon-btn:hover {
      background: var(--secondary-color);
    }

    .l-icon {
      font-size: 1.2rem;
      font-weight: bold;
    }
  `]
})
export class VcProfileCardComponent implements OnInit {
  default_profile = {
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VC',
    name: 'VC Firm',
    location: 'Set your location',
    portfolio_size: 'Add portfolio size',
    investment_range: 'Add investment range',
    focus_areas: ['Add focus area'],
    description: 'Add a description of your VC firm',
    linkedin: 'Add your LinkedIn link',
    email: '',
  };

  profile = { ...this.default_profile };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const authProfile = this.authService.getProfile();
    if (authProfile) {
      this.profile = {
        avatar: authProfile.avatar || this.default_profile.avatar,
        name: authProfile.name || this.default_profile.name,
        location: authProfile.location || this.default_profile.location,
        portfolio_size: authProfile.portfolio_size || this.default_profile.portfolio_size,
        investment_range: authProfile.investment_range || this.default_profile.investment_range,
        focus_areas: authProfile.focus_areas || this.default_profile.focus_areas,
        description: authProfile.description || this.default_profile.description,
        linkedin: authProfile.linkedin || this.default_profile.linkedin,
        email: authProfile.email || this.default_profile.email,
      };
    }
  }

  onIconClick(type: string) {
    let url = '';
    switch (type) {
      case 'linkedin':
        url = `https://linkedin.com/company/${this.profile.linkedin}`;
        break;
      case 'email':
        url = `mailto:${this.profile.email}`;
        break;
    }
    if (url) {
      window.open(url, '_blank');
    }
  }
} 