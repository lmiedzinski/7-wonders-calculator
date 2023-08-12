import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointsCalculatorRoutingModule } from './points-calculator-routing.module';
import { PointsCalculatorComponent } from './points-calculator.component';
import { SharedModule } from '../shared/shared.module';
import { PointsCalculatorService } from './services/points-calculator.service';

@NgModule({
  declarations: [PointsCalculatorComponent],
  imports: [CommonModule, PointsCalculatorRoutingModule, SharedModule],
  providers: [PointsCalculatorService],
})
export class PointsCalculatorModule {}
