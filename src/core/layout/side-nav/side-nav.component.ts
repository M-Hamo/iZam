import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MenuService } from '@core/services';
import { Children, NavItem, TrackNavItem } from '@core/utils';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { retry, switchMap, take, tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'side-nav',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, MatIconModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent implements OnInit {
  readonly #MenuService = inject(MenuService);
  readonly #destroyRef = inject(DestroyRef);

  public readonly menuList: WritableSignal<NavItem[]> = signal([]);

  public readonly updateList: Signal<NavItem[]> = computed(() =>
    this.editMode()
      ? structuredClone(this.menuList())
      : structuredClone(this.menuList())
  );

  // TODO: show no data & loader
  public readonly dataLoaded: WritableSignal<boolean> = signal(false);

  public readonly editMode: WritableSignal<boolean> = signal(false);

  public ngOnInit(): void {
    this._getMenuList().pipe(take(1)).subscribe();
  }

  public onOpenNav = (list: NavItem[], item: NavItem): void => {
    list.forEach((nav) => (nav.opened = item.id === nav.id && !nav.opened));
  };

  public onSaveChange = (): void => {
    this.dataLoaded.set(false);
    const payload = this.updateList().map(({ opened, ...nav }) => ({ ...nav }));

    this.#MenuService
      .updateMenu(payload)
      .pipe(
        take(1),
        retry(1),
        switchMap(() => this._getMenuList())
      )
      .subscribe();
  };

  public drop = (
    list: NavItem[] | Children[],
    event: CdkDragDrop<NavItem[] | Children[]>
  ): void => {
    const { id } = list.at(event.previousIndex) as NavItem;
    this._track({ id, from: event.previousIndex, to: event.currentIndex });
    moveItemInArray(list, event.previousIndex, event.currentIndex);
  };

  private _track = (item: TrackNavItem): void => {
    this.#MenuService
      .trackMenu(item)
      .pipe(retry(1), takeUntilDestroyed(this.#destroyRef))
      .subscribe();
  };

  private _getMenuList = (): Observable<NavItem[]> => {
    return this.#MenuService.getMenuList$.pipe(
      retry(2),
      tap((res: NavItem[]) => {
        this.menuList.set(res);
        this.editMode.set(false);
        this.dataLoaded.set(true);
      })
    );
  };
}
