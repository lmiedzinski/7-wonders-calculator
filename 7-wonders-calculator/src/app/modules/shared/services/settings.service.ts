import { Injectable } from '@angular/core';
import { AppSettings } from './../interfaces/appSettings';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public appSettings$: Observable<AppSettings>;

  private appSettingsLocalStorageKey = 'app-settings';
  private appSettingsSubject: BehaviorSubject<AppSettings>;

  constructor() {
    let localAppSettings = this.getItem(this.appSettingsLocalStorageKey);
    this.appSettingsSubject = new BehaviorSubject(
      localAppSettings ?? this.getDefaultAppSettings()
    );
    this.appSettings$ = this.appSettingsSubject.asObservable();
  }

  public saveAppSettings(appSettings: AppSettings): void {
    this.setItem(this.appSettingsLocalStorageKey, appSettings);
    this.appSettingsSubject.next(appSettings);
  }

  private getDefaultAppSettings(): AppSettings {
    return {
      isLeadersActive: false,
      isCitiesActive: false,
      isArmadaActive: false,
      isEdificeActive: false,
      players: [],
    };
  }

  private setItem(key: string, item: any): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  private getItem(key: string): any {
    const itemValue = localStorage.getItem(key);
    if (itemValue == null) return null;
    return JSON.parse(itemValue);
  }
}
