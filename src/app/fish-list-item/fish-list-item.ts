import { Component, input } from '@angular/core';
import {Fish} from '../shared/models/fish';

@Component({
  imports: [],
  selector: 'app-fish-list-item',
  styleUrl: './fish-list-item.scss',
  templateUrl: './fish-list-item.html',
})
export class FishListItem {
  testProperty = input.required<Fish>();
}
