import { CommonModule } from '@angular/common';
import { Component, model, ModelSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent {
  public readonly selected: ModelSignal<boolean> = model(false);
}
