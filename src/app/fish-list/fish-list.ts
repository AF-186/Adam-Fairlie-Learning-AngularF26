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
  place2FishCount = this.fishService.place2FishCount;

  onFishOpened(fish: Fish) {
    console.warn("Clicked entry", fish.id, ": ", fish.name)
    this.fishService.removeFish(fish.id)
  }
  // Not sure why Assignment 4 asked us to use the output from Assignment 3 for removal
  // That signal was for opening the cards. Now you can't do that

  addNewFish() {
    let fishNum
    if (this.fishCount() > 0) {
      fishNum = this.fishList()[this.fishCount() - 1].id + 1
    } else {
      fishNum = 1
    }
    this.fishService.addFish( {id: fishNum, name: "Fish " + fishNum, location: "Place 2", weather: "Rain", time: "12:00"} )
  }
  // Now takes the id of the last fish in the list, and increments once

  constructor() {
    effect(() => {
      console.log("List is now ", this.fishCount(), " entries long.")
    })
  }
}
