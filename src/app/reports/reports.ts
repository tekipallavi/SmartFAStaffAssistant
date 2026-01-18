import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';
import { StorageService } from '../services/storage.service';

export interface Charge {
  caseName: string;
  submittedDate: string;
  incidentDate: string;
  incident: string;
  status: string;
  county: string;
  reportCategory: string;
  offender?: string;
  matchId: number;
}

@Component({
  selector: 'app-reports',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatButtonModule, MatDialogModule, MatSnackBarModule, FormsModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule, MatMenuModule, MatDividerModule, MatIconModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  @ViewChild('contextMenu') contextMenu!: MatMenu;
  
  displayedColumns: string[] = ['caseName', 'submittedDate', 'incidentDate', 'incident', 'status', 'county', 'reportCategory', 'actions'];
  dataSource: Charge[] = [];

  pageSize = 10;
  pageIndex = 0;
  contextMenuPosition = { x: '0px', y: '0px' };
  selectedRow: Charge | null = null;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.fetchReports();
  }

  fetchReports() {
    let mockData = [
            {
              "caseName": "CH0001",
              "submittedDate": "2023-01-01",
              "incidentDate": "2023-01-01",
              "incident": "Manchester United vs Liverpool",
              "status": "Open",
              "county": "Greater Manchester",
              "reportCategory": "Serious",
              "offender": "Wayne Rooney",
              "matchId": 1
            },
            {
              "caseName": "CH0002",
              "submittedDate": "2023-01-02",
              "incidentDate": "2023-01-02",
              "incident": "Arsenal vs Chelsea",
              "status": "Closed",
              "county": "London",
              "reportCategory": "Non Serious",
              "offender": "David Beckham",
              "matchId": 2
            },
            {
              "caseName": "CH0003",
              "submittedDate": "2023-01-03",
              "incidentDate": "2023-01-03",
              "incident": "Tottenham vs Manchester City",
              "status": "Open",
              "county": "London",
              "reportCategory": "Serious",
              "offender": "Cristiano Ronaldo",
              "matchId": 3
            }];
    this.http.get<{ success: boolean; data: Charge[] }>('http://localhost:3000/api/get-reports')
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.dataSource = response.data;
          }
        },
        error: (error) => {
          console.error('Error fetching reports:', error);
          // Fallback to mock data
          this.dataSource = mockData
        }
      });
      // Removed
      this.dataSource = mockData;
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  onCellClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  runAIAnalysis() {
    // Open dialog for criteria
  }

  getHistory(matchId: number) {
    // Open history dialog
    const dialogRef = this.dialog.open(HistoryDialogComponent, {
      width: '800px',
      data: { matchId }
    });
  }

  // Context menu methods
  onRowRightClick(event: MouseEvent, row: Charge): void {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.selectedRow = row;
  }

  isFlagged(caseName: string): boolean {
    return this.storageService.isFlagged(caseName);
  }

  flagCase(caseName: string, matchId: number): void {
    this.storageService.flagCase(caseName, matchId);
  }

  unflagCase(caseName: string): void {
    this.storageService.unflagCase(caseName);
  }

  addReminder(caseName: string, matchId: number): void {
    const dialogRef = this.dialog.open(ReminderDialogComponent, {
      width: '400px',
      data: { caseName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.reminderText) {
        this.storageService.addReminder(caseName, matchId, result.reminderText);
      }
    });
  }
}
