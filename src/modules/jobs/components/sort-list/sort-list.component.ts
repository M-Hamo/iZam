import { CommonModule } from '@angular/common';
import { Component, inject, model, ModelSignal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { JobsService } from '@modules/jobs/services';

@Component({
  selector: 'sort-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './sort-list.component.html',
  styleUrl: './sort-list.component.scss',
})
export class SortListComponent {
  readonly #sortList = inject(JobsService);

  public readonly sortList: Signal<string[]> = this.#sortList.sortList;

  public sortBy: ModelSignal<string> = model('');
}
