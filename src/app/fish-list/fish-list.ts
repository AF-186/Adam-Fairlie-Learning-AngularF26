import { Component, inject, effect } from '@angular/core';
import { Fish } from '../shared/models/fish';
import { FishListItem } from '../fish-list-item/fish-list-item';
import { FishService } from '../services/fish';
import {RouterLink} from '@angular/router';

@Component({
  imports: [
    FishListItem,
    RouterLink
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
  place2Fish = this.fishService.place2Fish;
  fishCount = this.fishService.fishCount;
  place2FishCount = this.fishService.place2FishCount;

  onFishOpened(fish: Fish) {
    console.warn("Clicked entry", fish.id, ": ", fish.name)
  }

  addNewFish() {
    let fishNum
    if (this.fishCount() > 0) {
      fishNum = this.fishList()[this.fishCount() - 1].id + 1
    } else {
      fishNum = 1
    }
    this.fishService.addFish( {id: fishNum, name: "Fish " + fishNum, description: 'Aeiou', location: "Place 2", icon: '' } )
  }

  constructor() {
    effect(() => {
      console.log("List is now ", this.fishCount(), " entries long.")
    })
  }
}
