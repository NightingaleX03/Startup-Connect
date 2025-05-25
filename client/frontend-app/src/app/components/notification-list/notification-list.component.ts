import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Notification {
  text: string;
  read: boolean;
}

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent {
  notifications: Notification[] = [
    { text: 'This forum has sent you a message.', read: false },
    { text: "You have a request from a VC firm that's looking to invest in you.", read: false },
    { text: 'Your profile was viewed by 3 investors today.', read: false },
    { text: 'A new group you might like: AI & Innovation Exchange.', read: false },
    { text: 'Your leaderboard rank has increased!', read: false }
  ];

  removeNotification(index: number) {
    this.notifications.splice(index, 1);
  }
} 