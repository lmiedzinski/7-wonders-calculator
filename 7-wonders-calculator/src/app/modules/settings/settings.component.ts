import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../shared/services/settings.service';
import { AppSettings } from '../shared/interfaces/appSettings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.settingsService.appSettings$.subscribe(
        (appSettings: AppSettings) => {
          this.appSettings = appSettings;
          this.settingsForm = this.prepareForm();
          appSettings.players.forEach(() => {
            this.addPlayer();
          });
          this.settingsForm.patchValue({
            activeExtensions: {
              leaders: appSettings.isLeadersActive,
              cities: appSettings.isCitiesActive,
              edifice: appSettings.isEdificeActive,
              armada: appSettings.isArmadaActive,
            },
            players: appSettings.players,
          });
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  appSettings: AppSettings | null = null;

  settingsForm = this.prepareForm();

  get players() {
    return this.settingsForm.get('players') as FormArray;
  }

  addPlayer() {
    this.players.push(this.fb.control('', Validators.required));
  }

  removePlayer(index: number): void {
    this.players.removeAt(index);
  }

  onFormSubmit() {
    const value = this.settingsForm.value;
    this.settingsService.saveAppSettings({
      isLeadersActive: value.activeExtensions?.leaders ?? false,
      isCitiesActive: value.activeExtensions?.cities ?? false,
      isArmadaActive: value.activeExtensions?.armada ?? false,
      isEdificeActive: value.activeExtensions?.edifice ?? false,
      players: (value.players as string[] | undefined) ?? [],
    });
  }

  private prepareForm(): FormGroup {
    return this.fb.group({
      activeExtensions: this.fb.group({
        leaders: [false],
        cities: [false],
        armada: [false],
        edifice: [false],
      }),
      players: this.fb.array([]),
    });
  }
}
