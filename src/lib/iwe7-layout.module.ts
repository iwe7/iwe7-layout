import { Iwe7BetterScrollModule } from './../../../iwe7-better-scroll/src/lib/iwe7-better-scroll.module';
import { CommonModule } from '@angular/common';
import { LayoutOutletComponent } from './layout-outlet/layout-outlet';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    Iwe7BetterScrollModule
  ],
  declarations: [LayoutOutletComponent],
  exports: [LayoutOutletComponent]
})
export class Iwe7LayoutModule { }
