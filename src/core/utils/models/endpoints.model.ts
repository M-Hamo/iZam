import { InjectionToken } from '@angular/core';

export class Endpoints {
  public readonly menu = {
    menuList: '/nav',
    trackList: '/track',
  };
}

export const END_POINTS = new InjectionToken<Endpoints>('END_POINTS', {
  providedIn: 'root',
  factory: () => new Endpoints(),
});
