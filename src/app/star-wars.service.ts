import { Injectable } from '@angular/core';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    {name: 'Ioda', side: ''},
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];

  private logService: LogService;

  constructor(logService: LogService) {
    this.logService = logService;
  }

  getCharacters(side) {
    if (side === 'all') {
      return [...this.characters];
    }
    const filterByChosenSide = char => char.side === side;
    return this.characters.filter(filterByChosenSide);
  }

  onSideChosen(charInfo) {
    const findByName = char => char.name === charInfo.name;
    const index = this.characters.findIndex(findByName);
    this.characters[index].side = charInfo.side;
    this.logService.writeLog(charInfo.name + ' changed side. New side: ' + charInfo.side);
  }
}
