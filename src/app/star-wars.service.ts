import { Injectable } from '@angular/core';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    {name: 'Ioda', side: ''},
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];

  constructor(private logService: LogService) {
  }

  getCharacters(side) {
    if (side === 'all') {
      return [...this.characters];
    }
    const filterByChosenSide = char => char.side === side;
    return this.characters.filter(filterByChosenSide);
  }

  onSideChosen(character) {
    const findByName = char => char.name === character.name;
    const index = this.characters.findIndex(findByName);
    this.characters[index].side = character.side;
    this.logService.writeLog(character.name + ' changed side. New side: ' + character.side);
  }

  addCharacter(character) {
    this.characters.push(character);
    this.logService.writeLog('New character was added: ' + character.name);
  }

}
