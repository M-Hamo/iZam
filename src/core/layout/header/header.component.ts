import { CommonModule } from '@angular/common';
import { Component, signal, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatDividerModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public readonly navList: Signal<NavItem[]> = signal([
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
}

export interface NavItem {
  title: string;
  icon: string;
}
