import { inject, Injectable } from '@angular/core';
import { END_POINTS, NavItem, TrackNavItem } from '@core/utils';
import { ConnectionService } from '@shared';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  readonly #connectionService = inject(ConnectionService);
  readonly #endpoints = inject(END_POINTS);

  public readonly getMenuList$: Observable<NavItem[]> =
    this.#connectionService.get(this.#endpoints.menu.menuList);

  public readonly updateMenu = (payload: NavItem[]): Observable<unknown> =>
    this.#connectionService.post(this.#endpoints.menu.menuList, payload);

  public readonly trackMenu = (payload: TrackNavItem): Observable<unknown> =>
    this.#connectionService.post(this.#endpoints.menu.trackList, payload);
}
