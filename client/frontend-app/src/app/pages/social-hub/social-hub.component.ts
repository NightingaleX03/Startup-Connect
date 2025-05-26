import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Discussion {
  pfp: string;
  date: string;
  title: string;
  tags: string[];
  description: string;
  startupName?: string;
  replies?: Reply[];
}

interface Post {
  title: string;
  tags: string[];
  description: string;
}

interface Reply {
  text: string;
  startupName: string;
  pfp: string;
  date: string;
}

@Component({
  selector: 'app-social-hub',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './social-hub.component.html',
  styleUrls: ['./social-hub.component.scss']
})
export class SocialHubComponent implements OnInit, OnDestroy {
  discussions: Discussion[] = [];
  filteredDiscussions: Discussion[] = [];
  searchQuery: string = '';
  selectedTags: string[] = [];
  sortOrder: 'newest' | 'oldest' = 'newest';
  showDiscussionPopup: boolean = false;
  activeDiscussion: Discussion | null = null;

  // Post creation
  newPost: Post = { title: '', tags: [], description: '' };
  formErrors: { [key: string]: string } = {};
  isSubmitting: boolean = false;

  filterTags: string[] = [];

  // Add a property for the startup name (should match the profile pill)
  startupName: string = 'Start Up Name';

  showSuccessPopup: boolean = false;

  tagsDropdownOpen: boolean = false;

  replyText: string = '';
  replyError: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadDiscussions();
    document.addEventListener('click', this.handleOutsideClick);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event: MouseEvent) => {
    const dropdown = document.querySelector('.sh-tags-dropdown-wrapper');
    if (dropdown && !dropdown.contains(event.target as Node)) {
      this.tagsDropdownOpen = false;
    }
  };

  loadDiscussions() {
    this.http.get<Discussion[]>('assets/discussions.json').subscribe({
      next: (data) => {
        this.discussions = data;
        this.updateFilterTags();
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading discussions:', error);
        // TODO: Show error message to user
      }
    });
  }

  updateFilterTags() {
    const tagSet = new Set<string>();
    this.discussions.forEach(discussion => {
      discussion.tags.forEach(tag => tagSet.add(tag));
    });
    this.filterTags = Array.from(tagSet).sort();
  }

  applyFilters() {
    let filtered = [...this.discussions];
    
    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(d =>
        d.title.toLowerCase().includes(query)
      );
    }

    // Apply tag filter
    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(d =>
        this.selectedTags.every(tag => 
          d.tags.some(t => t.toLowerCase() === tag.toLowerCase())
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return this.sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    this.filteredDiscussions = filtered;
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    if (!this.newPost.title.trim()) {
      this.formErrors['title'] = 'Please enter title';
      isValid = false;
    }

    if (!this.newPost.description.trim()) {
      this.formErrors['description'] = 'Please enter description';
      isValid = false;
    }

    // Tags are not strictly required for post creation, but you can enforce if needed
    // if (!this.newPost.tags || this.newPost.tags.length === 0) {
    //   this.formErrors['tags'] = 'At least one tag is required';
    //   isValid = false;
    // }

    return isValid;
  }

  formatRichText(text: string): string {
    // Convert markdown-like syntax to HTML
    // 1. Bold (**text**)
    let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // 2. Italic (--text--)
    html = html.replace(/--(.*?)--/g, '<em>$1</em>');

    // 3. Lists (bullets and numbers)
    // Split into lines
    const lines = html.split(/\r?\n/);
    let inUl = false;
    let inOl = false;
    let result = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Bullet list
      if (/^\s*\*\s+/.test(line)) {
        if (!inUl) {
          result += '<ul style="margin:0 0 0 1.2em;">';
          inUl = true;
        }
        result += '<li>' + line.replace(/^\s*\*\s+/, '') + '</li>';
        continue;
      } else if (inUl) {
        result += '</ul>';
        inUl = false;
      }
      // Numbered list
      if (/^\s*\d+\.\s+/.test(line)) {
        if (!inOl) {
          result += '<ol style="margin:0 0 0 1.2em;">';
          inOl = true;
        }
        result += '<li>' + line.replace(/^\s*\d+\.\s+/, '') + '</li>';
        continue;
      } else if (inOl) {
        result += '</ol>';
        inOl = false;
      }
      // Normal line
      result += line ? line + '<br>' : '<br>';
    }
    if (inUl) result += '</ul>';
    if (inOl) result += '</ol>';
    return result;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    // Create new discussion
    const newDiscussion: Discussion = {
      pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
      date: new Date().toISOString(),
      title: this.newPost.title,
      tags: this.newPost.tags as string[],
      description: this.formatRichText(this.newPost.description),
      startupName: this.startupName
    } as any;

    // Add to discussions array
    this.discussions.unshift(newDiscussion);
    this.applyFilters();

    // Log the new discussion for backend integration
    console.log('New discussion to save:', newDiscussion);
    // TODO: Send newDiscussion to backend API to update discussions.json

    // Show success popup
    this.showSuccessPopup = true;

    // Reset form
    this.newPost = { title: '', tags: [], description: '' };
    this.isSubmitting = false;

    // Hide popup after 2 seconds
    setTimeout(() => {
      this.showSuccessPopup = false;
    }, 2000);
  }

  openDiscussion(discussion: Discussion) {
    this.activeDiscussion = discussion;
    this.showDiscussionPopup = true;
  }

  closeDiscussion() {
    this.showDiscussionPopup = false;
    this.activeDiscussion = null;
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

  setSortOrder(order: 'newest' | 'oldest') {
    this.sortOrder = order;
    this.applyFilters();
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.applyFilters();
  }

  formatText(type: 'bold' | 'italic' | 'bullet' | 'number') {
    const textarea = document.querySelector('.sh-rich-text') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = this.newPost.description.substring(start, end);
    let replacement = '';

    switch (type) {
      case 'bold':
        replacement = `**${selectedText}**`;
        break;
      case 'italic':
        replacement = `*${selectedText}*`;
        break;
      case 'bullet':
        // Split by newlines and add bullet points
        const bulletLines = selectedText.split('\n').map(line => {
          // If line is already a bullet point, remove it
          if (line.trim().startsWith('* ')) {
            return line.trim().substring(2);
          }
          // If line is empty, keep it empty
          if (!line.trim()) {
            return '';
          }
          // Add bullet point
          return `* ${line.trim()}`;
        });
        replacement = bulletLines.join('\n');
        break;
      case 'number':
        // Split by newlines and add numbers
        const numberedLines = selectedText.split('\n').map((line, index) => {
          // If line is already numbered, remove the number
          const numberedMatch = line.trim().match(/^\d+\.\s+/);
          if (numberedMatch) {
            return line.trim().substring(numberedMatch[0].length);
          }
          // If line is empty, keep it empty
          if (!line.trim()) {
            return '';
          }
          // Add number
          return `${index + 1}. ${line.trim()}`;
        });
        replacement = numberedLines.join('\n');
        break;
    }

    // If no text is selected, add a new line with the format
    if (start === end) {
      const currentLine = this.getCurrentLine(textarea);
      const currentLineStart = this.getCurrentLineStart(textarea);
      const currentLineEnd = this.getCurrentLineEnd(textarea);
      const currentLineText = this.newPost.description.substring(currentLineStart, currentLineEnd);

      if (type === 'bullet' || type === 'number') {
        // For lists, check if we're already in a list
        const isInList = currentLineText.trim().match(/^(\*|\d+\.)\s+/);
        if (isInList) {
          // If we're in a list, add a new line with the same format
          const listChar = isInList[1];
          const nextNumber = listChar === '*' ? '*' : `${this.getNextListNumber(textarea)}.`;
          replacement = `\n${nextNumber} `;
        } else {
          // If we're not in a list, start a new one
          const listChar = type === 'bullet' ? '*' : '1.';
          replacement = `\n${listChar} `;
        }
      } else {
        // For bold and italic, just add the markers
        replacement = type === 'bold' ? '**' : '*';
      }
    }

    this.newPost.description = 
      this.newPost.description.substring(0, start) +
      replacement +
      this.newPost.description.substring(end);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      if (type === 'bullet' || type === 'number') {
        // Place cursor after the bullet/number
        const newPosition = start + replacement.length;
        textarea.setSelectionRange(newPosition, newPosition);
      } else {
        // For bold/italic, place cursor between the markers
        const newPosition = start + (type === 'bold' ? 2 : 1);
        textarea.setSelectionRange(newPosition, newPosition);
      }
    });
  }

  private getCurrentLine(textarea: HTMLTextAreaElement): string {
    const text = this.newPost.description;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    return lines[lines.length - 1];
  }

  private getCurrentLineStart(textarea: HTMLTextAreaElement): number {
    const text = this.newPost.description;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPos);
    const lastNewline = textBeforeCursor.lastIndexOf('\n');
    return lastNewline === -1 ? 0 : lastNewline + 1;
  }

  private getCurrentLineEnd(textarea: HTMLTextAreaElement): number {
    const text = this.newPost.description;
    const cursorPos = textarea.selectionStart;
    const textAfterCursor = text.substring(cursorPos);
    const nextNewline = textAfterCursor.indexOf('\n');
    return nextNewline === -1 ? text.length : cursorPos + nextNewline;
  }

  private getNextListNumber(textarea: HTMLTextAreaElement): number {
    const text = this.newPost.description;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = text.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    
    // Find the last numbered item
    let lastNumber = 0;
    for (let i = lines.length - 1; i >= 0; i--) {
      const match = lines[i].trim().match(/^(\d+)\.\s+/);
      if (match) {
        lastNumber = parseInt(match[1]);
        break;
      }
    }
    
    return lastNumber + 1;
  }

  onDescriptionKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter') return;
    const textarea = event.target as HTMLTextAreaElement;
    const value = textarea.value;
    const cursorPos = textarea.selectionStart;
    // Get the current line up to the cursor
    const textBeforeCursor = value.substring(0, cursorPos);
    const lines = textBeforeCursor.split('\n');
    const currentLine = lines[lines.length - 1];

    // Bullet list
    const bulletMatch = currentLine.match(/^\s*\*\s+/);
    if (bulletMatch) {
      event.preventDefault();
      const insert = '\n* ';
      const before = value.substring(0, cursorPos);
      const after = value.substring(cursorPos);
      this.newPost.description = before + insert + after;
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPos + insert.length;
      });
      return;
    }

    // Numbered list
    const numberMatch = currentLine.match(/^\s*(\d+)\.\s+/);
    if (numberMatch) {
      event.preventDefault();
      const nextNumber = parseInt(numberMatch[1], 10) + 1;
      const insert = `\n${nextNumber}. `;
      const before = value.substring(0, cursorPos);
      const after = value.substring(cursorPos);
      this.newPost.description = before + insert + after;
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = cursorPos + insert.length;
      });
      return;
    }
    // Otherwise, let Enter behave normally
  }

  // Utility to check if description is longer than 3 lines (approx. 300 chars or 3 line breaks)
  isDescriptionTruncated(description: string): boolean {
    // Remove HTML tags for line count
    const plain = description.replace(/<[^>]+>/g, '');
    // Count line breaks
    const lines = plain.split(/\r?\n/);
    if (lines.length > 3) return true;
    // Or, if a single line is very long (over 300 chars), also show see more
    return plain.length > 300;
  }

  closeSuccessPopup() {
    this.showSuccessPopup = false;
  }

  toggleTagsDropdown() {
    this.tagsDropdownOpen = !this.tagsDropdownOpen;
  }

  toggleTagSelection(tag: string) {
    if (!this.newPost.tags) this.newPost.tags = [];
    const idx = this.newPost.tags.indexOf(tag);
    if (idx === -1) {
      this.newPost.tags.push(tag);
    } else {
      this.newPost.tags.splice(idx, 1);
    }
  }

  removeTag(tag: string) {
    if (!this.newPost.tags) return;
    const idx = this.newPost.tags.indexOf(tag);
    if (idx !== -1) {
      this.newPost.tags.splice(idx, 1);
    }
  }

  submitReply() {
    if (!this.replyText.trim()) {
      this.replyError = 'Reply cannot be empty.';
      return;
    }
    if (!this.activeDiscussion) return;
    const reply: Reply = {
      text: this.replyText,
      startupName: this.startupName,
      pfp: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Math.random(),
      date: new Date().toISOString()
    };
    if (!this.activeDiscussion.replies) this.activeDiscussion.replies = [];
    this.activeDiscussion.replies.push(reply);
    this.replyText = '';
    this.replyError = '';
    // Log for backend integration
    console.log('New reply to save:', reply, 'for discussion:', this.activeDiscussion.title);
    // TODO: Send updated discussion to backend API to update discussions.json
  }
}
