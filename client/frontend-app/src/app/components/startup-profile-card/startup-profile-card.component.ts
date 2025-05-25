import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-startup-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './startup-profile-card.component.html',
  styleUrls: ['./startup-profile-card.component.scss']
})
export class StartupProfileCardComponent implements OnInit {
  @Output() tagsChange = new EventEmitter<string[]>();

  profile = {
    avatar: 'https://i.pinimg.com/originals/9d/4d/56/9d4d568a5c914fa0a82815cd2a503b90.jpg',
    name: 'Tech Startup Name',
    size: '11-50',
    location: 'Toronto, Canada',
    foundedOn: '2019',
    foundedBy: 'Cookie Monster',
    tags: ['AI', 'Fintech', 'Cloud', 'SaaS', 'Big Data'],
    description: 'Tech Startup is revolutionizing the financial sector with cutting-edge AI and cloud-based solutions. Our mission is to empower businesses to make smarter decisions, automate processes, and unlock new growth opportunities. With a passionate team and a focus on innovation, we deliver scalable products that drive real-world impact for our clients.',
    instagram: 'https://instagram.com/techstartup',
    linkedin: 'https://linkedin.com/company/techstartup',
    email: 'contact@techstartup.com'
  };

  ngOnInit() {
    this.tagsChange.emit(this.profile.tags);
  }

  onIconClick(platform: string) {
    alert(`you clicked this icon (${platform})`);
  }
} 