import { Routes } from '@angular/router';
import { Reports } from './reports/reports';
import { Charges } from './charges/charges';
import { Activities } from './activities/activities';

export const routes: Routes = [
  { path: '', redirectTo: '/reports', pathMatch: 'full' },
  { path: 'reports', component: Reports },
  { path: 'charges', component: Charges },
  { path: 'activities', component: Activities }
];
