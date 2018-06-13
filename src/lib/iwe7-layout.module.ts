import { Iwe7ActivityIndicatorModule } from 'iwe7-activity-indicator';
import { MenuEmptyComponent } from './menu/menu-empty/menu-empty';
import { CommonModule } from '@angular/common';
import { LayoutOutletComponent } from './layout-outlet/layout-outlet';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    Iwe7ActivityIndicatorModule
  ],
  declarations: [LayoutOutletComponent, MenuEmptyComponent],
  exports: [LayoutOutletComponent],
  entryComponents: [
    MenuEmptyComponent
  ]
})
export class Iwe7LayoutModule { }
