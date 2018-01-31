import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters = [
    {name: 'Ioda', side: ''},
    {name: 'Luke Skywalker', side: ''},
    {name: 'Darth Vader', side: ''}
  ];
  chosenList = 'all';

  constructor() { }

  ngOnInit() {
  }

  onChoose(side) {
    this.chosenList = side;
  }

  isActive(side): boolean {
    return side === this.chosenList;
  }

  getCharacters() {
    if (this.chosenList === 'all') {
      return [...this.characters];
    }
    const filterByChosenSide = char => char.side === this.chosenList;
    return this.characters.filter(filterByChosenSide);
  }

}
