import { Component, inject } from '@angular/core';
import { Fish } from '../shared/models/fish';
import { FishListItem } from '../fish-list-item/fish-list-item';
import { FishService } from '../services/fish';

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
  // Don't know if I need this anymore

  private fishService = inject(FishService);
  fishList = this.fishService.fishList;

  onFishOpened(fish: Fish) {
    console.warn("Clicked entry", fish.id, ": ", fish.name)
  }
}
