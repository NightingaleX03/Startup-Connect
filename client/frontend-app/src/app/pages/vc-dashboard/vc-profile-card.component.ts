import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vc-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vc-profile-card">
      <img class="vc-pfp" [src]="profile.avatar" alt="Profile Picture">
      <div class="vc-firm-name">{{ profile.name }}</div>
      <div class="vc-location">{{ profile.location }}</div>
    </div>
  `,
  styleUrls: ['./vc-profile-card.component.scss']
})
export class VcProfileCardComponent implements OnInit {
  profile = {
    avatar: '',
    name: '',
    location: ''
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const authProfile = this.authService.getProfile();
    if (authProfile) {
      this.profile = {
        avatar: authProfile.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=VC',
        name: authProfile.name || 'VC Firm',
        location: authProfile.location || 'Set your location'
      };
    }
  }
} 