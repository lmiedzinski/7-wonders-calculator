import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WonderSelectionRoutingModule } from './wonder-selection-routing.module';
import { WonderSelectionComponent } from './wonder-selection.component';


@NgModule({
  declarations: [
    WonderSelectionComponent
  ],
  imports: [
    CommonModule,
    WonderSelectionRoutingModule
  ]
})
export class WonderSelectionModule { }
