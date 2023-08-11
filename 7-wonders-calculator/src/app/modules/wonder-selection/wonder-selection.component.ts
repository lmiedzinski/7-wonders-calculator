import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/services/settings.service';
import { AppSettings } from '../shared/interfaces/appSettings';
import { WonderSelectionService } from './services/wonder-selection.service';
import { WonderSelectionResult } from './interfaces/wonderSelectionResult';

@Component({
  selector: 'app-wonder-selection',
  templateUrl: './wonder-selection.component.html',
  styleUrls: ['./wonder-selection.component.scss'],
})
export class WonderSelectionComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private settingsService: SettingsService,
    private wonderSelectionService: WonderSelectionService
  ) {}

  appSettings: AppSettings | null = null;
  selectionResult: WonderSelectionResult[] = [];

  ngOnInit(): void {
    this.subscription.add(
      this.settingsService.appSettings$.subscribe(
        (appSettings: AppSettings) => {
          this.appSettings = appSettings;
        }
      )
    );

    this.subscription.add(
      this.wonderSelectionService.selectionResult$.subscribe(
        (selectionResult: WonderSelectionResult[]) => {
          this.selectionResult = selectionResult;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  randomlySelectWonders(): void {
    this.wonderSelectionService.selectWonders(this.appSettings);
  }
}
