import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reminder-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <h2 mat-dialog-title>Add Reminder</h2>
    <mat-dialog-content>
      <div class="reminder-content">
        <div class="case-info">
          <strong>Case Number:</strong> {{ data.caseName }}
        </div>
        <mat-form-field class="full-width">
          <mat-label>Reminder Notes</mat-label>
          <textarea matInput [(ngModel)]="reminderText" placeholder="Enter reminder text..." rows="4"></textarea>
        </mat-form-field>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!reminderText.trim()">
        Save Reminder
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .reminder-content {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }

    .case-info {
      padding: 0.75rem;
      background-color: #f5f5f5;
      border-left: 4px solid rgb(225, 38, 28);
      border-radius: 4px;
    }

    .full-width {
      width: 100%;
    }

    mat-form-field {
      width: 100%;
    }
  `]
})
export class ReminderDialogComponent {
  reminderText: string = '';

  constructor(
    public dialogRef: MatDialogRef<ReminderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { caseName: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.reminderText.trim()) {
      this.dialogRef.close({ reminderText: this.reminderText.trim() });
    }
  }
}
