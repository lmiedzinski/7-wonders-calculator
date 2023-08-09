import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WonderSelectionComponent } from './wonder-selection.component';

const routes: Routes = [{ path: '', component: WonderSelectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WonderSelectionRoutingModule {}
