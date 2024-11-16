import { CommonModule } from '@angular/common';
import {
  Component,
  model,
  ModelSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'jobs-positions',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './jobs-positions.component.html',
  styleUrl: './jobs-positions.component.scss',
})
export class JobsPositionsComponent {
  public setAlert: ModelSignal<boolean> = model(false);

  public readonly onOpenMenu: OutputEmitterRef<void> = output();
}
