import { AppSettings } from '../../shared/interfaces/appSettings';
import { PointsCalculationInput } from '../interfaces/pointsCalculationInput';
import { PointsCalculationResult } from '../interfaces/pointsCalculationResult';
import { BehaviorSubject, Observable } from 'rxjs';

export class PointsCalculatorService {
  public calculationResult$: Observable<PointsCalculationResult[]>;

  private calculationResultSubject: BehaviorSubject<PointsCalculationResult[]>;

  constructor() {
    this.calculationResultSubject = new BehaviorSubject(
      [] as PointsCalculationResult[]
    );
    this.calculationResult$ = this.calculationResultSubject.asObservable();
  }

  clearResults(): void {
    this.calculationResultSubject.next([]);
  }

  calculatePoints(
    appSettings: AppSettings | null,
    pointsCalculationInput: PointsCalculationInput[]
  ): void {
    const results: PointsCalculationResult[] = pointsCalculationInput.map(
      (playerInput) => {
        let totalPoints = 0;
        totalPoints += Math.floor(playerInput.money / 3);
        totalPoints += playerInput.military;
        totalPoints += playerInput.wonders;
        totalPoints += playerInput.blueCards;
        totalPoints += playerInput.yellowCards;

        if (appSettings?.isCitiesActive) {
          totalPoints += playerInput.citiesCards;
        }
        if (appSettings?.isLeadersActive) {
          totalPoints += playerInput.leadersCards;
        }
        if (appSettings?.isArmadaActive) {
          totalPoints += playerInput.armadaCards;
        }
        if (appSettings?.isEdificeActive) {
          totalPoints += playerInput.edificeCards;
        }

        totalPoints += playerInput.guilds;
        totalPoints += playerInput.other;
        totalPoints += this.calculateSciencePoints(
          playerInput.scienceGearCount,
          playerInput.scienceCompassCount,
          playerInput.sciencePlateCount
        );

        return {
          playerName: playerInput.playerName,
          totalPoints: totalPoints,
          place: 0,
        };
      }
    );

    results.sort((a, b) => b.totalPoints - a.totalPoints);
    let prevPlayerPoints = -1;
    let prevPlayerRank = 0;
    let rankCounter = 0;
    for (const player of results) {
      rankCounter++;
      if (player.totalPoints !== prevPlayerPoints) {
        prevPlayerRank = rankCounter;
        prevPlayerPoints = player.totalPoints;
      }
      player.place = prevPlayerRank;
    }

    this.calculationResultSubject.next(results);
  }

  private calculateSciencePoints(
    gearCount: number,
    compassCount: number,
    plateCount: number
  ): number {
    const setCount = Math.min(gearCount, compassCount, plateCount);
    return (
      setCount * 7 +
      gearCount * gearCount +
      compassCount * compassCount +
      plateCount * plateCount
    );
  }
}
