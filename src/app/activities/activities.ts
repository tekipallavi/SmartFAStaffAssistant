import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { StorageService, CaseAction } from  '../services/storage.service';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatTabsModule],
  templateUrl: './activities.html',
  styleUrl: './activities.css',
})
export class Activities implements OnInit {
  actions: CaseAction[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadActions();
  }

  loadActions(): void {
    this.actions = this.storageService.getAllActions();
  }

  getFlaggedActions(): CaseAction[] {
    return this.actions.filter(a => a.action === 'flag' && a.reminderText !== 'unflagged');
  }

  getReminderActions(): CaseAction[] {
    return this.actions.filter(a => a.action === 'reminder');
  }

  getActionIcon(action: CaseAction): string {
    if (action.action === 'flag') {
      return action.reminderText === 'unflagged' ? 'flag_off' : 'flag';
    }
    return 'edit_note';
  }

  getActionLabel(action: CaseAction): string {
    if (action.action === 'flag') {
      return action.reminderText === 'unflagged' ? 'Flag Removed' : 'Flagged';
    }
    return 'Reminder Added';
  }

  getActionColor(action: CaseAction): string {
    if (action.action === 'flag') {
      return action.reminderText === 'unflagged' ? 'default' : 'warn';
    }
    return 'primary';
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  getTimeAgo(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + 'y ago';
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + 'mo ago';
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + 'd ago';
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + 'h ago';
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + 'm ago';
    
    return Math.floor(seconds) + 's ago';
  }
}
