import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'wonder-selection',
    loadChildren: () =>
      import('./modules/wonder-selection/wonder-selection.module').then(
        (m) => m.WonderSelectionModule
      ),
  },
  {
    path: 'points-calculator',
    loadChildren: () =>
      import('./modules/points-calculator/points-calculator.module').then(
        (m) => m.PointsCalculatorModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./modules/settings/settings.module').then(
        (m) => m.SettingsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
