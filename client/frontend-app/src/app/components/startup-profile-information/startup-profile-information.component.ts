import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StartupProfileService } from './startup-profile-information.service';

@Component({
  selector: 'app-startup-profile-information',
  imports: [
    FormsModule, 
    CommonModule,
  ],
  templateUrl: './startup-profile-information.component.html',
  styleUrl: './startup-profile-information.component.scss'
})
export class StartupProfileInformationComponent {

  @Output() close = new EventEmitter<void>();
  errorMessage: string = '';
  profile = {
    avatar: '',
    name: '',
    size: '',
    location: '',
    founded_on: '',
    founded_by: '',
    tags: '', 
    description: '',
    instagram: '',
    linkedin: '',
  };

  constructor(private profileService: StartupProfileService) {}

  onClose() {
    this.close.emit();
  }

  submitProfile() {

    const profileData = {
      ...this.profile,
      tags: this.profile.tags.split(',').map(tag => tag.trim())  
    };

    this.profileService.addStartupProfile(profileData).subscribe({
      next: (response: any) => {
        console.log('Profile updated successfully:', response);
      },
      error: (error) => {
        this.errorMessage = error?.error?.error || 'An error occurred';
      }
    });
  }

}
