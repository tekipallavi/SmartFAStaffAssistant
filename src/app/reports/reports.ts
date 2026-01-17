import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HistoryDialogComponent } from '../history-dialog/history-dialog.component';

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
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatDialogModule, MatSnackBarModule, FormsModule, MatFormFieldModule, MatSelectModule, MatProgressSpinnerModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  displayedColumns: string[] = ['caseName', 'submittedDate', 'incidentDate', 'incident', 'status', 'county', 'reportCategory', 'actions'];
  dataSource: Charge[] = [];

  pageSize = 10;
  pageIndex = 0;

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchReports();
  }

  fetchReports() {
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
          this.dataSource = [
            { caseName: 'Case 1', submittedDate: '2023-01-01', incidentDate: '2023-01-01', incident: 'Team A vs Team B', status: 'Open', county: 'County 1', reportCategory: 'Serious', matchId: 1 },
            { caseName: 'Case 2', submittedDate: '2023-01-02', incidentDate: '2023-01-02', incident: 'Team C vs Team D', status: 'Closed', county: 'County 2', reportCategory: 'Non Serious', matchId: 2 },
          ];
        }
      });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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
}
