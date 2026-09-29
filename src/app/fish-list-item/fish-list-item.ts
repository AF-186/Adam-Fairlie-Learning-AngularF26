import { Component, input, output } from '@angular/core';
import {Fish} from '../shared/models/fish';

@Component({
  imports: [],
  selector: 'app-fish-list-item',
  styleUrl: './fish-list-item.scss',
  templateUrl: './fish-list-item.html',
})
export class FishListItem {
  fish = input.required<Fish>();
  expanded = false;
  opened = output<Fish>();

  toggle(): void {
    this.expanded = !this.expanded;
    this.opened.emit(this.fish());
  }
}
