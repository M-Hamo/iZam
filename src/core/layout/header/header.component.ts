import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { SideProfileComponent } from '../side-profile/side-profile.component';
import { HeaderItem, UserInfo } from '@core/utils';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GStatic, ParamsHelper } from '@shared/helpers';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    SideProfileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #destroyRef = inject(DestroyRef);

  public searchInput: FormControl<string | null> = new FormControl(null);

  public readonly navList: Signal<HeaderItem[]> = signal([
    {
      title: 'Home',
      icon: 'assets/icons/Home.svg',
    },
    {
      title: 'Jobs',
      icon: 'assets/icons/Vector.svg',
    },
    {
      title: 'Employers',
      icon: 'assets/icons/3 User.svg',
    },
  ]);

  public readonly userInfo: Signal<UserInfo> = signal({
    name: 'Ahmed Amaar',
    description: 'Ux UI designer',
    img: 'assets/images/person.jpg',
  });

  public ngOnInit(): void {
    this._searchChangeHandler();
    this._paramsChanges();
  }

  private _paramsChanges = (): void => {
    this.#route.queryParamMap
      .pipe(
        tap((params: ParamMap) => {
          const search = ParamsHelper.search(params, 'search') as string;

          if (search && !GStatic.isEqual(this.searchInput.value, search))
            this.searchInput.patchValue(search);
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  };

  private _searchChangeHandler = (): void => {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value: any) =>
          from(
            this.#router.navigate([], {
              queryParams: { search: value || null },
              queryParamsHandling: 'merge',
            })
          )
        ),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  };
}
