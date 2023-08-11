import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WonderSelectionRoutingModule } from './wonder-selection-routing.module';
import { WonderSelectionComponent } from './wonder-selection.component';
import { SharedModule } from '../shared/shared.module';
import { WonderSelectionService } from './services/wonder-selection.service';

@NgModule({
  declarations: [WonderSelectionComponent],
  imports: [CommonModule, WonderSelectionRoutingModule, SharedModule],
  providers: [WonderSelectionService],
})
export class WonderSelectionModule {}
