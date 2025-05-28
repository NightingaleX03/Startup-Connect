import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface VCFirm {
  name: string;
  logo: string;
  location: string;
  tags: string[];
  description: string;
  portfolioSize: string;
  investmentRange: string;
  dateAdded: Date;
}

@Component({
  selector: 'app-vc-firms',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vc-firms.component.html',
  styleUrls: ['./vc-firms.component.scss']
})
export class VcFirmsComponent implements OnInit {
  searchQuery: string = '';
  sortOrder: 'newest' | 'oldest' = 'newest';
  firms: VCFirm[] = [];
  filteredFirms: VCFirm[] = [];
  selectedTags: string[] = [];
  availableTags: string[] = [
    'Technology',
    'Healthcare',
    'Consumer',
    'Software',
    'Fintech',
    'Crypto',
    'Startups',
    'Accelerator',
    'Early Stage'
  ];

  ngOnInit() {
    // Sample data - replace with actual API call
    this.firms = [
      {
        name: 'Sequoia Capital',
        logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
        location: 'Menlo Park, CA',
        tags: ['Technology', 'Healthcare', 'Consumer'],
        description: 'One of the most successful venture capital firms, focusing on early-stage and growth-stage investments.',
        portfolioSize: '300+',
        investmentRange: '$100K - $100M',
        dateAdded: new Date('2024-01-15')
      },
      {
        name: 'Andreessen Horowitz',
        logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
        location: 'Menlo Park, CA',
        tags: ['Software', 'Fintech', 'Crypto'],
        description: 'Known for backing bold entrepreneurs who move fast and break things.',
        portfolioSize: '250+',
        investmentRange: '$50K - $50M',
        dateAdded: new Date('2024-02-01')
      },
      {
        name: 'Y Combinator',
        logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
        location: 'Mountain View, CA',
        tags: ['Startups', 'Accelerator', 'Early Stage'],
        description: 'The most successful startup accelerator, helping founders build great companies.',
        portfolioSize: '2000+',
        investmentRange: '$125K - $500K',
        dateAdded: new Date('2024-03-01')
      },
      {
        name: 'Accel Partners',
        logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
        location: 'Palo Alto, CA',
        tags: ['Technology', 'Enterprise', 'SaaS'],
        description: 'Global venture capital firm that partners with exceptional founders building category-defining companies.',
        portfolioSize: '400+',
        investmentRange: '$500K - $50M',
        dateAdded: new Date('2024-01-20')
      },
      {
        name: 'Kleiner Perkins',
        logo: 'https://angular.io/assets/images/logos/angular/angular.svg',
        location: 'Menlo Park, CA',
        tags: ['Healthcare', 'Enterprise', 'Consumer'],
        description: 'Venture capital firm investing in early-stage, growth, and incubation companies.',
        portfolioSize: '350+',
        investmentRange: '$1M - $100M',
        dateAdded: new Date('2024-02-15')
      }
    ];
    this.applyFilters();
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'newest' ? 'oldest' : 'newest';
    this.applyFilters();
  }

  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index === -1) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags.splice(index, 1);
    }
    this.applyFilters();
  }

  onSearch() {
    this.applyFilters();
  }

  private applyFilters() {
    let filtered = [...this.firms];

    // Apply search filter - only search through firm names
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(firm => 
        firm.name.toLowerCase().includes(query)
      );
    }

    // Apply tag filters
    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(firm => 
        this.selectedTags.some(tag => firm.tags.includes(tag))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = a.dateAdded.getTime();
      const dateB = b.dateAdded.getTime();
      return this.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    this.filteredFirms = filtered;
  }
} 