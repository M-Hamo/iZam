import { NgModule } from '@angular/core';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';

@NgModule({
  imports: [
    NgProgressModule.withConfig({
      color: '#3D8E41',
      trickleSpeed: 999,
      spinner: false,
    }),
    NgProgressHttpModule,
  ],
  exports: [NgProgressModule, NgProgressHttpModule],
})
export class NgxProgressBarModule {}
