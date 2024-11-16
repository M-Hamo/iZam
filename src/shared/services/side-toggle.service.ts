import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SideToggleService {
  public readonly toggled: WritableSignal<boolean> = signal(true);

  public toggle = (): void => this.toggled.set(!this.toggled());

  public open = (): void => this.toggled.set(true);

  public close = (): void => this.toggled.set(false);
}
