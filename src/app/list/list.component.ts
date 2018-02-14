import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  characters = [];
  loadedSide = 'all';

  constructor(
    private activatedRouter: ActivatedRoute,
    private swService: StarWarsService
  ) {}

  loadCharacters() {
    this.activatedRouter.params.subscribe(params => {
      this.loadedSide = params.side;
      this.characters = this.swService.getCharacters(params.side);
    });
    this.updateOnChange();
  }

  private updateOnChange() {
    this.swService.charactersChanged.subscribe(() => {
      this.characters = this.swService.getCharacters(this.loadedSide);
    });
  }

  ngOnInit() {
    this.loadCharacters();
  }

}
