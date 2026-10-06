import { computed, Service, signal } from '@angular/core';
import { Fish } from '../shared/models/fish';

@Service()
export class FishService {
  private fishes = signal<Fish[]>([
    { id: 1, name: 'Fish 1', location: 'Place', weather: 'Rain', time: '22:00' },
    { id: 2, name: 'Fish 2', location: 'Place' },
    { id: 3, name: 'Fish 3', location: 'Place 2', time: '12:00' },
    { id: 4, name: 'Fish 4', location: 'Place 2' },
    { id: 5, name: 'Fish 5', location: 'Place 3', weather: 'Thunder'},
    { id: 6, name: 'Fish 6', location: 'Place 4' },
  ]);

  fishList = this.fishes.asReadonly();

  fishCount = computed(() => this.fishes().length);
  place2Fish = computed(() => this.fishes().filter(f => f.location == "Place 2"))
  place2FishCount = computed(() => this.place2Fish().length)
  // I wouldn't say this is a trivial duplicate
  // But it was the given example, so I don't expect a bonus mark

  addFish(newFish:Fish): void {
    this.fishes.update((list) => [...list, newFish]);
  }

  removeFish(fishId: number): void {
    this.fishes.update(list => list.filter(fish => fish.id !== fishId))
  }

}
