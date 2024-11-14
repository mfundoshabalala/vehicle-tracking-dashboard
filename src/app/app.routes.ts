import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'vehicle', pathMatch: 'full' },
      { path: 'vehicle', component: DashboardComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
