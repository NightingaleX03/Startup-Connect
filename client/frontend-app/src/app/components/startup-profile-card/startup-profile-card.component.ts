import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartupProfileService } from '../startup-profile-information/startup-profile-information.service';

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

  constructor(private profileService: StartupProfileService) {

  }
  
  private isEmpty(value: any): boolean {
    return value === undefined || value === null || value === '';
  }

  ngOnInit() {
    this.tagsChange.emit(this.profile.tags);

    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
      console.error('No logged-in user found in localStorage');
      return;
    }
    const currentUser = JSON.parse(currentUserStr);

    this.profileService.getStartupProfile().subscribe({
      next: (response: any) => {
        if (response && response.profile) {
          const backendProfile = response.profile;

          this.profile = {
            ...this.profile,
            avatar: !this.isEmpty(backendProfile.avatar) ? backendProfile.avatar : this.default_profile.avatar,
            name: !this.isEmpty(backendProfile.name) ? backendProfile.name : this.default_profile.name,
            size: !this.isEmpty(backendProfile.size) ? backendProfile.size : this.default_profile.size,
            location: !this.isEmpty(backendProfile.location) ? backendProfile.location : this.default_profile.location,
            foundedOn: !this.isEmpty(backendProfile.founded_on) ? backendProfile.founded_on : this.default_profile.foundedOn,
            foundedBy: !this.isEmpty(backendProfile.founded_by) ? backendProfile.founded_by : this.default_profile.foundedBy,
            tags: (backendProfile.tags && backendProfile.tags.length > 0) ? backendProfile.tags : this.default_profile.tags,
            description: !this.isEmpty(backendProfile.description) ? backendProfile.description : this.default_profile.description,
            instagram: !this.isEmpty(backendProfile.instagram) ? backendProfile.instagram : this.default_profile.instagram,
            linkedin: !this.isEmpty(backendProfile.linkedin) ? backendProfile.linkedin : this.default_profile.linkedin,
            email: !this.isEmpty(backendProfile.email) ? backendProfile.email : this.default_profile.email,
          };

          this.tagsChange.emit(this.profile.tags);
        }
      },
      error: (error: any) => {
        console.log('No profile found, using default.');
      }
    });
  }  onIconClick(platform: string) {
    alert(`you clicked this icon (${platform})`);
  }
} 