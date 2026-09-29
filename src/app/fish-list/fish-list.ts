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

  fishList: Fish[] = [
    { id: 1, name: 'Fish 1', location: 'Place', weather: 'Rain', time: '22:00' },
    { id: 2, name: 'Fish 2', location: 'Place' },
    { id: 3, name: 'Fish 3', location: 'Place 2', time: '12:00' },
    { id: 4, name: 'Fish 4', location: 'Place 2' },
    { id: 5, name: 'Fish 5', location: 'Place 3', weather: 'Thunder'},
    { id: 6, name: 'Fish 6', location: 'Place 4' },
  ];
}
