import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StartupProfileCardComponent } from '../../components/startup-profile-card/startup-profile-card.component';
import { EntryModalComponent } from '../../components/entry-modal/entry-modal.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, StartupProfileCardComponent, EntryModalComponent],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  happinessScore = 7.5; // Placeholder value
  pitchText = '';
  pitchPreview = '';
  entryModalOpen = false;

  // --- Calendar grid logic ---
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  today = new Date();
  month: number;
  year: number;
  firstOfMonth!: Date;
  daysInMonth!: number;
  firstDayOfWeek!: number;
  numWeeks!: number;
  calendar: (number | null)[][] = [];
  monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Example: entries for some days (row, col) => true if entry exists
  wellnessEntries: { [key: string]: boolean } = {
    '2024-06-03': true, '2024-06-05': true, '2024-06-07': true, '2024-06-10': true, '2024-06-12': true
  };
  hoveredCell: { row: number, col: number } | null = null;
  showTooltip = false;
  tooltipText = '';
  tooltipX = 0;
  tooltipY = 0;

  wellnessCategories = [
    { label: 'Mental Well-Being', key: 'mental' },
    { label: 'Physical Health & Lifestyle', key: 'physical' },
    { label: 'Workplace Culture & Connection', key: 'culture' },
    { label: 'Productivity & Work-Life Balance', key: 'productivity' },
    { label: 'Financial Wellness & Stability', key: 'financial' },
    { label: 'Personal Growth & Career Development', key: 'growth' },
  ];

  // Example: scores for today (replace with real logic)
  todayScores: { [key: string]: number } = {};

  getCategoryScore(key: string): number | undefined {
    return this.todayScores[key];
  }

  constructor() {
    this.month = this.today.getMonth();
    this.year = this.today.getFullYear();
    this.buildCalendar();
  }

  buildCalendar() {
    this.firstOfMonth = new Date(this.year, this.month, 1);
    this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
    this.firstDayOfWeek = (this.firstOfMonth.getDay() + 6) % 7; // 0=Monday, 6=Sunday
    this.numWeeks = Math.ceil((this.daysInMonth + this.firstDayOfWeek) / 7);
    this.calendar = [];
    let day = 1 - this.firstDayOfWeek;
    for (let week = 0; week < this.numWeeks; week++) {
      const row: (number | null)[] = [];
      for (let dow = 0; dow < 7; dow++) {
        if (day > 0 && day <= this.daysInMonth) {
          row.push(day);
        } else {
          row.push(null);
        }
        day++;
      }
      this.calendar.push(row);
    }
  }

  prevMonth() {
    if (this.month === 0) {
      this.month = 11;
      this.year--;
    } else {
      this.month--;
    }
    this.buildCalendar();
  }

  nextMonth() {
    if (this.month === 11) {
      this.month = 0;
      this.year++;
    } else {
      this.month++;
    }
    this.buildCalendar();
  }

  getDateString(day: number | null): string {
    if (!day) return '';
    return `${this.year}-${(this.month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  }

  isEntry(day: number | null): boolean {
    if (!day) return false;
    return !!this.wellnessEntries[this.getDateString(day)];
  }

  isToday(day: number | null): boolean {
    if (!day) return false;
    const d = new Date(this.year, this.month, day);
    return d.toDateString() === this.today.toDateString();
  }

  onCellClick(day: number | null, event: MouseEvent) {
    if (!this.isEntry(day)) {
      this.tooltipText = 'no entry recorded';
      this.showTooltip = true;
      this.tooltipX = event.clientX;
      this.tooltipY = event.clientY;
      setTimeout(() => this.showTooltip = false, 1500);
    }
  }

  onCellMouseEnter(day: number | null) {
    this.hoveredCell = { row: 0, col: 0 }; // Not used, but could be extended
  }
  onCellMouseLeave() {
    this.hoveredCell = null;
  }

  isDayHeading(row: number): string | null {
    // Only show M/W/F as row headings
    const weekDay = row % 7;
    if (weekDay === 0) return 'M';
    if (weekDay === 2) return 'W';
    if (weekDay === 4) return 'F';
    return null;
  }

  // --- Pitch deck logic ---
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
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
        reader.readAsArrayBuffer(file);
      } else {
        this.pitchPreview = 'Unsupported file type.';
      }
    }
  }

  sendPitch() {
    const pitchString = this.pitchText.trim() ? this.pitchText : this.pitchPreview;
    if (!pitchString) {
      alert('Please upload a file or enter your pitch.');
      return;
    }
    alert('Pitch sent!\n' + pitchString.substring(0, 200) + (pitchString.length > 200 ? '...' : ''));
    this.pitchText = '';
    this.pitchPreview = '';
  }

  openEntryModal() {
    this.entryModalOpen = true;
  }

  closeEntryModal() {
    this.entryModalOpen = false;
  }
} 