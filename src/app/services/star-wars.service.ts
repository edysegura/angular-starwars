import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

import { LogService } from './log.service';

@Injectable()
export class StarWarsService {
  private characters = [
    {name: 'Ioda', side: ''},
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];

  charactersChanged = new Subject<void>();

  constructor(
    private logService: LogService,
    private httpClient: HttpClient
  ) {}

  onError(httpResponse) {
    this.logService.writeLog(httpResponse.message);
  }

  fetchCharacters() {
    this.httpClient.get('https://swapi.co/api/people/')
      .map(this.getOnlyNames)
      .subscribe(
        this.updateCharacters.bind(this),
        this.onError.bind(this)
      );
  }

  private updateCharacters(characters: any) {
    this.characters = characters;
    this.charactersChanged.next();
  }

  private getOnlyNames(data) {
    const characters = data.results.map(char => {
      return { name: char.name, side: '' };
    });
    return characters;
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
    this.charactersChanged.next();
    this.logService.writeLog(character.name + ' changed side. New side: ' + character.side);
  }

  isAdded(name: string): boolean {
    const index = this.characters.findIndex( char => char.name === name );
    return index > -1;
  }

  addCharacter(character) {
    if (this.isAdded(character.name)) { return; }
    this.characters.push(character);
    this.logService.writeLog('New character was added: ' + character.name);
  }

}
