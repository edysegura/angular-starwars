import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  private updateSubscription: Subscription;

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
    this.updateSubscription = this.swService.charactersChanged.subscribe(() => {
      this.characters = this.swService.getCharacters(this.loadedSide);
    });
  }

  ngOnInit() {
    this.swService.fetchCharacters();
    this.loadCharacters();
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }

}
