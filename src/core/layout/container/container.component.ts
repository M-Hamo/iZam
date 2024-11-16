import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideToggleService } from '@shared';
import { BreakpointObserverService } from '@shared/services/breakpoint-observer.service';
import { Breakpoints } from '@angular/cdk/layout';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

export enum DrawerModeTypeEnum {
  OVER = 'over',
  SIDE = 'side',
}

export type DrawerMode = DrawerModeTypeEnum.OVER | DrawerModeTypeEnum.SIDE;

@Component({
  selector: 'layout-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    HeaderComponent,
    SideNavComponent,
  ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss',
})
export class ContainerComponent implements OnInit {
  readonly #sideToggleService = inject(SideToggleService);
  readonly #breakpointService = inject(BreakpointObserverService);
  readonly #destroyRef = inject(DestroyRef);

  public readonly drawerOpened: Signal<boolean> =
    this.#sideToggleService.toggled;

  public drawerMode: WritableSignal<DrawerMode> = signal(
    DrawerModeTypeEnum.SIDE
  );

  public ngOnInit(): void {
    this.#breakpointService.currentBreakpoint$
      .pipe(
        tap((val: string) => {
          if (
            val === Breakpoints.Medium ||
            val === Breakpoints.Large ||
            val === Breakpoints.XLarge ||
            val === '(min-width: 500px)'
          ) {
            this.#sideToggleService.open();
            this.drawerMode.set(DrawerModeTypeEnum.SIDE);
          } else {
            this.#sideToggleService.close();
            this.drawerMode.set(DrawerModeTypeEnum.OVER);
          }
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  public onModalOpenedChange = (val: boolean): void => {
    if (!val) this.#sideToggleService.close();
  };
}
