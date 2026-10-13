import { Component, input, inject, output } from '@angular/core';
import { Fish } from '../shared/models/fish';
import { FishService } from '../services/fish';

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
  protected fishService = inject(FishService);

  toggle(): void {
    this.expanded = !this.expanded;
    this.opened.emit(this.fish());
  }

  removeFishLI(id: number): void {
    this.fishService.removeFish(id);
  }
}
