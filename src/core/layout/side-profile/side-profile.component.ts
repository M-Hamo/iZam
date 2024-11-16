import { CommonModule } from '@angular/common';
import { Component, input, InputSignal, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderItem, UserInfo } from '@core/utils';

@Component({
  selector: 'side-profile',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './side-profile.component.html',
  styleUrl: './side-profile.component.scss',
})
export class SideProfileComponent {
  public readonly userInfo: InputSignal<UserInfo> = input.required();

  public readonly menuList: Signal<HeaderItem[]> = signal([
    {
      title: 'Home',
      icon: 'assets/icons/Home2.svg',
    },
    {
      title: 'Jobs',
      icon: 'assets/icons/Bag.svg',
    },
    {
      title: 'Employers',
      icon: 'assets/icons/3 Users.svg',
    },
    {
      title: 'Notifications',
      icon: 'assets/icons/bell2.svg',
    },
    {
      title: 'Messaging',
      icon: 'assets/icons/Work.svg',
    },
  ]);
}
