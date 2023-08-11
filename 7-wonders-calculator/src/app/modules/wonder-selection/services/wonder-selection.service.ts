import { AppSettings } from './../../shared/interfaces/appSettings';
import { BehaviorSubject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { WonderSelectionResult } from '../interfaces/wonderSelectionResult';

export class WonderSelectionService {
  public selectionResult$: Observable<WonderSelectionResult[]>;

  private selectionResultSubject: BehaviorSubject<WonderSelectionResult[]>;

  constructor() {
    this.selectionResultSubject = new BehaviorSubject(
      [] as WonderSelectionResult[]
    );
    this.selectionResult$ = this.selectionResultSubject.asObservable();
  }

  selectWonders(appSettings: AppSettings | null): void {
    let result: WonderSelectionResult[] = [];
    if (appSettings == null) {
      this.selectionResultSubject.next(result);
      return;
    }

    let wonders = this.getBaseBoards();
    if (appSettings.isLeadersActive) wonders.concat(this.getLeadersBoards());
    if (appSettings.isCitiesActive) wonders.concat(this.getCitiesBoards());
    if (appSettings.isArmadaActive) wonders.concat(this.getArmadaBoards());
    if (appSettings.isEdificeActive) wonders.concat(this.getEdificeBoards());

    let sides = this.getBoardSides();
    let players = appSettings.players;

    const selectedWonders = _.sampleSize(wonders, players.length);

    for (let i = 0; i < players.length; i++) {
      const playerName = players[i];
      const playerBoard = selectedWonders[i];
      result.push({
        playerName: playerName,
        board: playerBoard,
        side: _.sample(sides) ?? '',
      });
    }

    this.selectionResultSubject.next(result);
  }

  private getBaseBoards(): string[] {
    return [
      'Olympia',
      'Alexandria',
      'Babylon',
      'Ephesos',
      'Halikarnassos',
      'Rhodos',
      'Gizah',
    ];
  }

  private getLeadersBoards(): string[] {
    return ['Abu Simbel', 'Roma'];
  }

  private getCitiesBoards(): string[] {
    return ['Petra', 'Byzantium'];
  }

  private getArmadaBoards(): string[] {
    return ['Siracusa'];
  }

  private getEdificeBoards(): string[] {
    return ['Ur', 'Carthage'];
  }

  private getBoardSides(): string[] {
    return ['Sun', 'Moon'];
  }
}
