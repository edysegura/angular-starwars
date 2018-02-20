import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';

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
    private http: Http
  ) {}

  fetchCharacters() {
    this.http.get('https://swapi.co/api/people').subscribe (
      (response: Response) => {
        console.log(response);
      }
    );
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
