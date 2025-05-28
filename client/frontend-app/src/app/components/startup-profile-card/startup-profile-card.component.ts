import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupProfileService } from '../startup-profile-information/startup-profile-information.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-startup-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './startup-profile-card.component.html',
  styleUrls: ['./startup-profile-card.component.scss']
})
export class StartupProfileCardComponent implements OnInit {
  @Output() tagsChange = new EventEmitter<string[]>();

  default_profile = {
    avatar: 'https://i.pinimg.com/originals/9d/4d/56/9d4d568a5c914fa0a82815cd2a503b90.jpg',
    name: localStorage.getItem('username'),
    size: 'Add the size of your startup',
    location: 'Set your location',
    foundedOn: 'Add the date your startup was founded',
    foundedBy: 'Add the name of the founder(s)',
    tags: ['Add a tag', 'Add another tag'],
    description: 'Add a description of your startup',
    instagram: 'Add your Instagram link',
    linkedin: 'Add your LinkedIn link',
    email: '',
  };

  profile = { ...this.default_profile };

  constructor(
    private profileService: StartupProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.tagsChange.emit(this.profile.tags);

    // Get profile from auth service
    const authProfile = this.authService.getProfile();
    if (authProfile) {
      this.profile = {
        avatar: authProfile.avatar || this.default_profile.avatar,
        name: authProfile.name || this.default_profile.name,
        size: authProfile.size || this.default_profile.size,
        location: authProfile.location || this.default_profile.location,
        foundedOn: authProfile.founded_on || this.default_profile.foundedOn,
        foundedBy: authProfile.founded_by || this.default_profile.foundedBy,
        tags: authProfile.tags || this.default_profile.tags,
        description: authProfile.description || this.default_profile.description,
        instagram: authProfile.instagram || this.default_profile.instagram,
        linkedin: authProfile.linkedin || this.default_profile.linkedin,
        email: authProfile.email || this.default_profile.email,
      };
      this.tagsChange.emit(this.profile.tags);
    }
  }

  onIconClick(type: string) {
    let url = '';
    switch (type) {
      case 'instagram':
        url = `https://instagram.com/${this.profile.instagram}`;
        break;
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

  isEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
  }
} 