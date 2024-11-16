import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SortListComponent } from '../sort-list/sort-list.component';
import { JobsPositionsComponent } from '../jobs-positions/jobs-positions.component';
import { SideToggleService } from '@shared';
import { JobComponent } from '../job/job.component';

const Components: Array<any[] | any> = [
  SortListComponent,
  JobsPositionsComponent,
  JobComponent,
];

@Component({
  selector: 'job-list',
  standalone: true,
  imports: [CommonModule, Components, MatIconModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss',
})
export class JobListComponent {
  readonly #sideToggleService = inject(SideToggleService);

  public sortBy: WritableSignal<string> = signal('Top match');

  public setAlert: WritableSignal<boolean> = signal(false);

  public onOpenMenu = (): void => this.#sideToggleService.open();

  effect$ = effect(() => {
    console.log(this.sortBy());
    console.log(this.setAlert());
  });
}
