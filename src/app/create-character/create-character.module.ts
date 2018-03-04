import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreateCharacterComponent } from './create-character.component';

const routes = [
  { path: '', component: CreateCharacterComponent }
];

@NgModule({
  declarations: [
    CreateCharacterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateCharacterModule {}
