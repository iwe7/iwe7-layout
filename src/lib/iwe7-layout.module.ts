import { BetterCoreModule } from 'iwe7-better-scroll';
import { CommonModule } from '@angular/common';
import { LayoutOutletComponent } from './layout-outlet/layout-outlet';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    BetterCoreModule
  ],
  declarations: [LayoutOutletComponent],
  exports: [LayoutOutletComponent]
})
export class Iwe7LayoutModule { }
