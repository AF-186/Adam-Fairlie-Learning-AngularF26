import { Component } from '@angular/core';
import {Fish} from '../shared/models/fish';
import {FishListItem} from '../fish-list-item/fish-list-item';

@Component({
  imports: [
    FishListItem
  ],
  selector: 'app-fish-list',
  styleUrl: './fish-list.scss',
  templateUrl: './fish-list.html',
})
export class FishList {
  title = 'FFXIV Fish Log';

  onFishOpened(fish: Fish) {
    console.warn("Clicked entry", fish.id, ": ", fish.name)
  }
}
