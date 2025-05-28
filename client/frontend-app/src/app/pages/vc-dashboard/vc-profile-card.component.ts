import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vc-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vc-profile-card">
      <img class="vc-pfp" [src]="profile.pfp" alt="Profile Picture">
      <div class="vc-firm-name">{{ profile.firm }}</div>
      <div class="vc-location">{{ profile.location }}</div>
    </div>
  `,
  styleUrls: ['./vc-profile-card.component.scss']
})
export class VcProfileCardComponent {
  profile = {
    pfp: 'https://angular.io/assets/images/logos/angular/angular.svg',
    firm: 'Angular Ventures',
    location: 'San Francisco, CA'
  };
} 