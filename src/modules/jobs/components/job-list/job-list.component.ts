import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SortListComponent } from '../sort-list/sort-list.component';
import { JobsPositionsComponent } from '../jobs-positions/jobs-positions.component';
import { SideToggleService } from '@shared';
import { JobComponent } from '../job/job.component';
import { JobsService } from '@modules/jobs/services';
import { Job } from '@modules/jobs/utils';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ParamsHelper } from '@shared/helpers';
import { tap } from 'rxjs';

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
export class JobListComponent implements OnInit {
  readonly #sideToggleService = inject(SideToggleService);
  readonly #jobsService = inject(JobsService);
  readonly #route = inject(ActivatedRoute);
  readonly #destroyRef = inject(DestroyRef);

  public sortBy: WritableSignal<string> = signal('Top match');

  public setAlert: WritableSignal<boolean> = signal(false);

  public jobList: Signal<Job[]> = this.#jobsService.filteredJobs;

  public onOpenMenu = (): void => this.#sideToggleService.open();

  public ngOnInit(): void {
    this._paramsChanges();
  }

  private _paramsChanges = (): void => {
    this.#route.queryParamMap
      .pipe(
        tap((params: ParamMap) => {
          const search = ParamsHelper.search(params, 'search') as string;
          this.#jobsService.filterJobs(search);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  };
}
