import { CommonModule } from '@angular/common';
import { Component, input, model, ModelSignal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Job } from '@modules/jobs/utils';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss',
})
export class JobComponent {
  public readonly job = input.required<Job>();
  public readonly selected: ModelSignal<boolean> = model(false);
}
