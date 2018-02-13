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

  constructor(
    private activatedRouter: ActivatedRoute,
    private swService: StarWarsService
  ) {}

  loadCharacters() {
    this.activatedRouter.params.subscribe(params => {
      this.characters = this.swService.getCharacters(params.side);
    });
  }

  ngOnInit() {
    this.loadCharacters();
  }
}
