import { Injectable, signal, Signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JobsService {
  public readonly sortList: Signal<string[]> = signal([
    'Top match',
    'Newest',
    'Latest',
  ]);
}
