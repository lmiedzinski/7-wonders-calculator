import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SettingsService } from '../shared/services/settings.service';
import { AppSettings } from '../shared/interfaces/appSettings';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PointsCalculatorService } from './services/points-calculator.service';
import { PointsCalculationInput } from './interfaces/pointsCalculationInput';
import { PointsCalculationResult } from './interfaces/pointsCalculationResult';

@Component({
  selector: 'app-points-calculator',
  templateUrl: './points-calculator.component.html',
  styleUrls: ['./points-calculator.component.scss'],
})
export class PointsCalculatorComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private pointsCalculatorService: PointsCalculatorService
  ) {}

  appSettings: AppSettings | null = null;
  calculationResult: PointsCalculationResult[] = [];
  calculatorForm: FormGroup = this.prepareForm();

  ngOnInit(): void {
    this.subscription.add(
      this.settingsService.appSettings$.subscribe(
        (appSettings: AppSettings) => {
          this.appSettings = appSettings;
          this.setForm();
        }
      )
    );

    this.subscription.add(
      this.pointsCalculatorService.calculationResult$.subscribe(
        (calculationResult: PointsCalculationResult[]) => {
          this.calculationResult = calculationResult;
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFormSubmit() {
    const value = this.calculatorForm.value;
    let calculationInput: PointsCalculationInput[] = [];
    value.players.forEach((player: any) => {
      calculationInput.push({
        playerName: player.playerName,
        money: player.money,
        military: player.military,
        wonders: player.wonders,
        blueCards: player.blueCards,
        yellowCards: player.yellowCards,
        citiesCards: player.citiesCards,
        leadersCards: player.leadersCards,
        edificeCards: player.edificeCards,
        armadaCards: player.armadaCards,
        guilds: player.guilds,
        other: player.other,
        scienceGearCount: player.scienceGearCount,
        scienceCompassCount: player.scienceCompassCount,
        sciencePlateCount: player.sciencePlateCount,
      });
    });
    this.pointsCalculatorService.calculatePoints(
      this.appSettings,
      calculationInput
    );
  }

  clearCalculations(): void {
    this.pointsCalculatorService.clearResults();
    this.setForm();
  }

  private prepareForm(): FormGroup {
    return this.fb.group({
      players: this.fb.array([]),
    });
  }

  private setForm(): void {
    this.calculatorForm = this.prepareForm();
    let playerFields: { playerName: string }[] = [];
    this.appSettings?.players.forEach((x) => {
      this.addPlayerFields();
      playerFields.push({
        playerName: x,
      });
    });
    this.calculatorForm.patchValue({ players: playerFields });
  }

  get players() {
    return this.calculatorForm.get('players') as FormArray;
  }

  private addPlayerFields() {
    this.players.push(
      this.fb.group({
        playerName: [''],
        money: [0],
        military: [0],
        wonders: [0],
        blueCards: [0],
        yellowCards: [0],
        citiesCards: [0],
        leadersCards: [0],
        edificeCards: [0],
        armadaCards: [0],
        guilds: [0],
        other: [0],
        scienceGearCount: [0],
        scienceCompassCount: [0],
        sciencePlateCount: [0],
      })
    );
  }
}
