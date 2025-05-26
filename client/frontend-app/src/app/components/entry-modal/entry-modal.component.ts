import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-entry-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './entry-modal.component.html',
  styleUrls: ['./entry-modal.component.scss']
})
export class EntryModalComponent {
  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  // Form fields (same as entry page)
  mentalMotivation = 3;
  mentalCoping = '';
  mentalScenario = '';
  mentalComfort = 3;
  physicalBreaks = 3;
  physicalMeals = 3;
  physicalObstacle = '';
  physicalSleep = 3;
  cultureValue = 3;
  cultureFriendships = 3;
  cultureImprove = '';
  cultureOpenness = 3;
  prodHours = 3;
  prodDistractions = 3;
  prodStrategy = '';
  prodDeadlines = 3;
  finStress = 3;
  finResources = '';
  finBenefits = '';
  finPrepared = 3;
  growthMentorship = 3;
  growthInvestment = 3;
  growthSkill = '';
  growthConfidence = 3;

  onClose() {
    this.close.emit();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      // TODO: Send data to backend
      console.log('Form submitted:', form.value);
      alert('Assessment submitted!');
      this.onClose();
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(form.controls).forEach(key => {
        const control = form.controls[key];
        control.markAsTouched();
      });
    }
  }
} 