import { Routes } from '@angular/router';
import { ContainerComponent } from '@core';
import { JobListComponent } from '@modules/jobs';

export const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: '/job-list',
        pathMatch: 'full',
      },
      {
        path: 'job-list',
        component: JobListComponent,
      },
    ],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
