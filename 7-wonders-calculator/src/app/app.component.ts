import { Component, HostListener, OnInit } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { OsType } from './interfaces/osType';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isOnline = false;
  isUpdateAvailable = false;
  androidPwaEvent: any | null = null;
  currentOs: OsType = OsType.None;
  osType = OsType;

  constructor(
    private window: Window,
    private swUpdate: SwUpdate,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.isOnline = this.window.navigator.onLine;

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter(
          (evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
        ),
        map((evt: any) => {
          this.isUpdateAvailable = true;
        })
      );
    }

    this.setupCurrentOs();
  }

  @HostListener('window:online')
  handleOnlineEvent() {
    this.isOnline = true;
  }

  @HostListener('window:offline')
  handleOfflineEvent() {
    this.isOnline = false;
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  handleAndroidPwaEvent(event: Event) {
    event.preventDefault();
    this.androidPwaEvent = event;
  }

  public handleVersionUpdate(): void {
    this.window.location.reload();
  }

  public handleUpdateDismiss(): void {
    this.isUpdateAvailable = false;
  }

  handleAndroidInstallPwa(): void {
    this.androidPwaEvent?.prompt();
    this.currentOs = OsType.None;
  }

  handlePwaInstallDismiss(): void {
    this.currentOs = OsType.None;
  }

  private setupCurrentOs(): void {
    if (this.platform.ANDROID) {
      this.currentOs = OsType.Android;
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode =
        'standalone' in this.window.navigator &&
        (<any>this.window.navigator)['standalone'];
      if (!isInStandaloneMode) {
        this.currentOs = OsType.Ios;
      }
    }
  }
}
