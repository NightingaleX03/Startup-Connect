import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  values = [
    {
      icon: '🎯',
      title: 'Innovation',
      description: 'We believe in pushing boundaries and embracing new technologies to solve complex problems.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Building strong connections between startups and investors to foster growth and success.'
    },
    {
      icon: '💡',
      title: 'Transparency',
      description: 'Creating an open and honest platform where everyone can thrive and succeed.'
    }
  ];

  team = [
    {
      name: 'Sarah',
      role: 'CEO & Co-founder',
      bio: 'Current Ontario Tech Student pursing a career in tech.',
      image: 'assets/images/team/sarah.jpg'
    },
    {
      name: 'Rosie',
      role: 'CEO & Co-founder',
      bio: 'Current Ontario Tech Student pursing a career in tech.',
      image: 'assets/images/team/rosie.jpg'
    },
  ];
}
