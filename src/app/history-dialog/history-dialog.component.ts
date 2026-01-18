import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Match {
  matchId: number;
  matchName: string;
  date: string;
  players: Player[];
}

export interface Player {
  playerId: number;
  playerName: string;
  countyname: string;
}

@Component({
  selector: 'app-history-dialog',
  standalone: true,
  imports: [MatDialogModule, MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatButtonModule, MatProgressSpinnerModule, FormsModule, CommonModule],
  templateUrl: './history-dialog.component.html',
  styleUrls: ['./history-dialog.component.css']
})
export class HistoryDialogComponent {
  match: Match | null = null;
  selectedOffender: number | null = null;
  selectedCriteria: string = '';
  analysis: string = '';
  loading: boolean = false;

  criteriaOptions = [
    { value: 'offence history', label: 'Offence History' },
    { value: 'recent news', label: 'Recent News' },
    { value: 'upcoming matches', label: 'Upcoming Matches' }
  ];

  constructor(
    public dialogRef: MatDialogRef<HistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { matchId: number },
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
    this.loading = false; // Ensure loading is false on init
    this.loadMatch();
  }

  loadMatch() {
    console.log('Loading match for', this.data.matchId);
    this.http.get<{ success: boolean; data: Match }>(`http://localhost:3000/api/get-match/${this.data.matchId}`)
      .subscribe(response => {
        console.log('Match loaded:', response);
        if (response.success) {
          this.match = response.data;
          this.cdr.detectChanges(); // Trigger change detection
        } else {
          this.snackBar.open('Failed to load match details', 'Close', { duration: 3000 });
          this.match = { matchId: this.data.matchId, matchName: 'Failed to load match', date: '', players: [] };
          this.cdr.detectChanges();
        }
      }, error => {
       /*  console.error('Error loading match:', error);
        this.snackBar.open('Error loading match details', 'Close', { duration: 3000 });
        this.match = { matchId: this.data.matchId, matchName: 'Error loading match', date: '', players: [] };
        this.cdr.detectChanges(); */
      });
    // Removed
    this.match = {
      "matchId": 1,
      "matchName": "Manchester United vs Liverpool",
      "date": "2023-01-01",
      "players": [
        {
          "playerId": 1,
          "playerName": "Wayne Rooney",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 31,
          "playerName": "Bruno Fernandes",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 32,
          "playerName": "Marcus Rashford",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 33,
          "playerName": "Jadon Sancho",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 34,
          "playerName": "Anthony Martial",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 35,
          "playerName": "Paul Pogba",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 36,
          "playerName": "Cristiano Ronaldo",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 37,
          "playerName": "David de Gea",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 38,
          "playerName": "Luke Shaw",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 39,
          "playerName": "Harry Maguire",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 40,
          "playerName": "Victor Lindelof",
          "countyname": "Greater Manchester"
        },
        {
          "playerId": 41,
          "playerName": "Mohamed Salah",
          "countyname": "Merseyside"
        },
        {
          "playerId": 42,
          "playerName": "Sadio Mane",
          "countyname": "Merseyside"
        },
        {
          "playerId": 43,
          "playerName": "Virgil van Dijk",
          "countyname": "Merseyside"
        },
        {
          "playerId": 44,
          "playerName": "Alisson Becker",
          "countyname": "Merseyside"
        },
        {
          "playerId": 45,
          "playerName": "Trent Alexander-Arnold",
          "countyname": "Merseyside"
        },
        {
          "playerId": 46,
          "playerName": "Andy Robertson",
          "countyname": "Merseyside"
        },
        {
          "playerId": 47,
          "playerName": "Jordan Henderson",
          "countyname": "Merseyside"
        },
        {
          "playerId": 48,
          "playerName": "Fabinho",
          "countyname": "Merseyside"
        },
        {
          "playerId": 49,
          "playerName": "Joel Matip",
          "countyname": "Merseyside"
        },
        {
          "playerId": 50,
          "playerName": "Diogo Jota",
          "countyname": "Merseyside"
        },
        {
          "playerId": 51,
          "playerName": "Curtis Jones",
          "countyname": "Merseyside"
        }
      ]
    };
  }

  generateAnalysis() {
    if (!this.selectedOffender || !this.selectedCriteria) {
      this.snackBar.open('Please select offender and criteria', 'Close', { duration: 3000 });
      return;
    }
    const selectedPlayer = this.match?.players.find(p => p.playerId === this.selectedOffender);
    if (!selectedPlayer) {
      this.snackBar.open('Selected player not found', 'Close', { duration: 3000 });
      return;
    }
    this.loading = true;
    console.log('Generating analysis for', this.selectedOffender, this.selectedCriteria);
    this.http.post<{ success: boolean; analysis: string }>('http://localhost:3000/api/generate-analysis', {
      offenderId: this.selectedOffender,
      criteria: this.selectedCriteria,
      offenderName: selectedPlayer.playerName
    }).subscribe(response => {
      console.log('Response:', response);
      this.loading = false;
      if (response.success) {
        this.analysis = response.analysis;
      } else {
        this.snackBar.open('Failed to generate analysis', 'Close', { duration: 3000 });
      }
    }, error => {
      console.error('Error:', error);
      this.loading = false;
      this.snackBar.open('Error generating analysis', 'Close', { duration: 3000 });
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}