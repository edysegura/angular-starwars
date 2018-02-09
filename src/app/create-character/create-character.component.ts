import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { StarWarsService } from '../star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSide = [
    { display: 'None', value: '' },
    { display: 'Light', value: 'light' },
    { display: 'Dark', value: 'dark' }
  ];

  constructor(private swService: StarWarsService) { }

  ngOnInit() {
  }

  isInvalid(field: FormControl): boolean {
    return field.invalid && field.touched;
  }

  onSubmit(submittedForm) {
    if (submittedForm.invalid) { return; }
    const { name, side } = submittedForm.value;
    const newCharacter = { name, side };
    this.swService.addCharacter(newCharacter);
  }
}
