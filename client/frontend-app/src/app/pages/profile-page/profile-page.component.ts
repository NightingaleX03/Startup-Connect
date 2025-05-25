import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StartupProfileCardComponent } from '../../components/startup-profile-card/startup-profile-card.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, StartupProfileCardComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  happinessScore = 7.5; // Placeholder value
  pitchText = '';
  pitchPreview = '';

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // For text-based files, just show the string
        if (file.type.includes('json') || file.type.includes('csv') || file.type.includes('text')) {
          this.pitchPreview = reader.result as string;
        } else if (file.type === 'application/pdf') {
          this.pitchPreview = 'PDF file loaded (cannot preview text here)';
        } else {
          this.pitchPreview = 'Unsupported file type.';
        }
      };
      if (file.type.includes('json') || file.type.includes('csv') || file.type.includes('text')) {
        reader.readAsText(file);
      } else if (file.type === 'application/pdf') {
        reader.readAsArrayBuffer(file); // Just to trigger onload
      } else {
        this.pitchPreview = 'Unsupported file type.';
      }
    }
  }

  sendPitch() {
    // Use pitchText if not empty, otherwise use pitchPreview
    const pitchString = this.pitchText.trim() ? this.pitchText : this.pitchPreview;
    if (!pitchString) {
      alert('Please upload a file or enter your pitch.');
      return;
    }
    // Here you would send pitchString to your backend or service
    alert('Pitch sent!\n' + pitchString.substring(0, 200) + (pitchString.length > 200 ? '...' : ''));
    this.pitchText = '';
    this.pitchPreview = '';
  }
} 