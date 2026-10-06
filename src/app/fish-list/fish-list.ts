import { Component, inject, effect } from '@angular/core';
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
  place2Fish = this.fishService.place2Fish;
  fishCount = this.fishService.fishCount;

  onFishOpened(fish: Fish) {
    console.warn("Clicked entry", fish.id, ": ", fish.name)
  }

  placeholder() {
    let fishNum = this.fishCount()+1
    this.fishService.addFish( {id: fishNum, name: "Fish " + fishNum, location: "Place 2", weather: "Rain", time: "12:00"} )
  }
  // This is not the right way to auto-increment IDs
  // It will only work as long as it's impossible to remove entries

  constructor() {
    effect(() => {
      console.log("List is now ", this.fishCount(), " entries long.")
    })
  }
}
