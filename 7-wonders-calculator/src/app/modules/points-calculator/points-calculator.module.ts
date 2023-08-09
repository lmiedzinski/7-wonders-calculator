import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointsCalculatorRoutingModule } from './points-calculator-routing.module';
import { PointsCalculatorComponent } from './points-calculator.component';


@NgModule({
  declarations: [
    PointsCalculatorComponent
  ],
  imports: [
    CommonModule,
    PointsCalculatorRoutingModule
  ]
})
export class PointsCalculatorModule { }
