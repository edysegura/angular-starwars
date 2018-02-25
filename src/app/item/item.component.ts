import { Component, OnInit, Input } from '@angular/core';

import { StarWarsService } from '../services/star-wars.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() character;

  constructor(private swService: StarWarsService) {
  }

  onAssign(side) {
    this.swService.onSideChosen({
      name: this.character.name,
      side: side
    });
  }

}
