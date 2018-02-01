import { Component, OnInit } from '@angular/core';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters = [];
  chosenSide = 'all';

  swService: StarWarsService;

  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit() {
  }

  onChoose(side) {
    this.chosenSide = side;
  }

  isActive(side): boolean {
    return side === this.chosenSide;
  }

  getCharacters() {
    return this.swService.getCharacters(this.chosenSide);
  }

}
