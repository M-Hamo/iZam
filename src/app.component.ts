import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgxProgressBarModule } from '@core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NgxProgressBarModule],
  template: `<ng-progress /><router-outlet />`,
})
export class AppComponent {
  public constructor(private readonly _iconRegistry: MatIconRegistry) {
    this._iconRegistry.setDefaultFontSetClass('material-icons-outlined');
    initFlowbite();
  }
}
