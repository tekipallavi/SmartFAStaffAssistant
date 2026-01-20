import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TextFieldModule } from '@angular/cdk/text-field';

import { ReportsService } from '../services/reports.service';

@Component({
    selector: 'app-ai-analysis-dialog',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        TextFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    templateUrl: './ai-analysis-dialog.component.html',
    styleUrl: './ai-analysis-dialog.component.scss'
})
export class AiAnalysisDialogComponent implements OnInit {
    inputQuery: string = '';
    response: any = null;

    reportCategories = ['Serious', 'Non Serious', 'All'];
    statuses = ['Open', 'Closed', 'Pending', 'All'];

    constructor(public dialogRef: MatDialogRef<AiAnalysisDialogComponent>, private reportsService: ReportsService) { }

    ngOnInit(): void { }

    onCancel(): void {
        this.dialogRef.close();
    }



    getAIFilterSuggestions() {
        console.log(this.inputQuery);
        this.reportsService.getAIBasedFilters(this.inputQuery).subscribe({
            next: (response: any) => {
                console.log('AI Filter Suggestions:', response);
                // Process and display the suggestions as needed
                this.response = response;
                this.dialogRef.close(this.response);
            },
            error: (error: any) => {
                console.error('Error fetching AI filter suggestions:', error);
            }
        });
    }

    onAnalyze(): void {
        this.getAIFilterSuggestions();
    }
}
