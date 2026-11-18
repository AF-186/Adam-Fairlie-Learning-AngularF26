import { computed, inject, Service } from '@angular/core';
import { Fish } from '../shared/models/fish';
import { FISH_CONFIG } from '../shared/fish-config';
import { XivApiService } from './xiv-api.service';

/**
 * Holds the fish list the rest of the app reads from.
 */
@Service()
export class FishService {
  private api = inject(XivApiService);
  private config = inject(FISH_CONFIG);


  private fishResource = this.api.list(30);

  /**
   * The value of an httpResource is writable, so this works like the old
   * signal() did. add/update/remove below still work on it
   */
  private fishes = this.fishResource.value;
  isLoading = this.fishResource.isLoading;
  error = this.fishResource.error;

  /** If the request failed just show an empty list instead of dying */
  fishList = computed(() => (this.error() ? [] : this.fishes()));

  fishCount = computed(() => this.fishList().length);
  place2Fish = computed(() => this.fishList().filter(f => f.location == this.config.defaultLocation));
  place2FishCount = computed(() => this.place2Fish().length);

  nextId() : number {
    return Math.max(0, ...this.fishes().map((f) => f.id)) + 1;
  }

  addFish(newFish: Fish): void {
    this.fishes.update((list) => [...list, newFish]);
  }

  updateFish(target: Fish) : void {
    this.fishes.update((list) => list.map((f) => (f.id === target.id ? target : f)));
  }

  removeFish(fishId: number): void {
    this.fishes.update(list => list.filter(fish => fish.id !== fishId))
  }
  getFish(id: number) : Fish | undefined {
    return this.getById(id);
  }
  getById(id: number) : Fish | undefined {
    return this.fishes().find((f) => f.id === id);
  }reload(): void {
    this.fishResource.reload();
  }
}
