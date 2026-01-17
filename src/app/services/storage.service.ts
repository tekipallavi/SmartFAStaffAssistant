import { Injectable } from '@angular/core';

export interface CaseAction {
  caseName: string;
  matchId: number;
  action: 'flag' | 'reminder';
  timestamp: Date;
  reminderText?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private flaggedCases: Set<string> = new Set();
  private caseActions: CaseAction[] = [];
  private readonly FLAGGED_CASES_KEY = 'flagged_cases';
  private readonly CASE_ACTIONS_KEY = 'case_actions';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    // Load flagged cases
    const flaggedCasesStr = localStorage.getItem(this.FLAGGED_CASES_KEY);
    if (flaggedCasesStr) {
      this.flaggedCases = new Set(JSON.parse(flaggedCasesStr));
    }

    // Load case actions
    const actionsStr = localStorage.getItem(this.CASE_ACTIONS_KEY);
    if (actionsStr) {
      this.caseActions = JSON.parse(actionsStr).map((action: any) => ({
        ...action,
        timestamp: new Date(action.timestamp)
      }));
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.FLAGGED_CASES_KEY, JSON.stringify(Array.from(this.flaggedCases)));
    localStorage.setItem(this.CASE_ACTIONS_KEY, JSON.stringify(this.caseActions));
  }

  flagCase(caseName: string, matchId: number): void {
    this.flaggedCases.add(caseName);
    this.addAction({
      caseName,
      matchId,
      action: 'flag',
      timestamp: new Date()
    });
    this.saveToStorage();
  }

  unflagCase(caseName: string): void {
    this.flaggedCases.delete(caseName);
    this.addAction({
      caseName,
      matchId: 0,
      action: 'flag',
      timestamp: new Date(),
      reminderText: 'unflagged'
    });
    this.saveToStorage();
  }

  isFlagged(caseName: string): boolean {
    return this.flaggedCases.has(caseName);
  }

  addReminder(caseName: string, matchId: number, reminderText: string): void {
    this.addAction({
      caseName,
      matchId,
      action: 'reminder',
      timestamp: new Date(),
      reminderText
    });
    this.saveToStorage();
  }

  private addAction(action: CaseAction): void {
    this.caseActions.push(action);
  }

  getAllActions(): CaseAction[] {
    return [...this.caseActions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getActionsByCase(caseName: string): CaseAction[] {
    return this.caseActions.filter(action => action.caseName === caseName);
  }

  getFlaggedCases(): string[] {
    return Array.from(this.flaggedCases);
  }
}
