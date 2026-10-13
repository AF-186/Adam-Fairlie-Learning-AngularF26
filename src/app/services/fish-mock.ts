import { computed, inject, Injectable, signal } from '@angular/core';
import { Fish } from '../shared/models/fish';
import { FISH_CONFIG } from '../shared/fish-config';

@Injectable()
export class MockFishService {
  private fishes = signal<Fish[]>([
    { id: 1, name: 'Fake 1', location: 'Place' },
    { id: 2, name: 'Fake 2', location: 'Place' },
    { id: 3, name: 'Fake 3', location: 'Place' },
    { id: 4, name: 'Fake 4', location: 'Place' },
    { id: 5, name: 'Fake 5', location: 'Place' },
    { id: 6, name: 'Fake 6', location: 'Place' },
  ]);

  private config = inject(FISH_CONFIG);

  fishList = this.fishes.asReadonly();

  fishCount = computed(() => this.fishes().length);
  // place2Fish = computed(() => this.fishes().filter(f => f.location == "Place 2"));
  place2Fish = computed(() => this.fishes().filter(f => f.location == this.config.defaultLocation));
  place2FishCount = computed(() => this.place2Fish().length);

  addFish(newFish:Fish): void {
    this.fishes.update((list) => [...list, newFish]);
  }

  removeFish(fishId: number): void {
    this.fishes.update(list => list.filter(fish => fish.id !== fishId))
  }

}
