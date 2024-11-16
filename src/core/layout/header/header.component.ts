import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { SideProfileComponent } from '../side-profile/side-profile.component';
import { HeaderItem, UserInfo } from '@core/utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
    SideProfileComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
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
}
