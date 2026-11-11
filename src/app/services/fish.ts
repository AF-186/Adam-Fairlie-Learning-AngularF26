import { computed, inject, Service, signal } from '@angular/core';
import { Fish } from '../shared/models/fish';
import { FISH_CONFIG } from '../shared/fish-config';
import {httpResource} from '@angular/common/http';

@Service()
export class FishService {
  private fishes = signal<Fish[]>([
    { id: 1, name: 'Fish 1', description: 'Abc', location: 'Place', icon: '' },
    { id: 2, name: 'Fish 2', description: '123', location: 'Place', icon: '' },
    { id: 3, name: 'Fish 3', description: 'Def', location: 'Place', icon: '' },
    { id: 4, name: 'Fish 4', description: '456', location: 'Place', icon: '' },
    { id: 5, name: 'Fish 5', description: 'Ghi', location: 'Place', icon: '' },
    { id: 6, name: 'Fish 6', description: '789', location: 'Place', icon: '' },
  ]);

  private config = inject(FISH_CONFIG);
  private contentResource = httpResource<Fish[]>(() => ({
    url: `${this.config.apiBaseUrl}/items`, // May not be /items
    params: { limit: 20 },
  }), { defaultValue: [] });

  private contents = this.contentResource.value; // Writable, replaces signal()
  contentList = computed(() =>
  this.contentResource.error() ? [] : this.contents());
  isLoading = this.contentResource.isLoading;
  error = this.contentResource.error;


  fishList = this.fishes.asReadonly();

  fishCount = computed(() => this.fishes().length);
  place2Fish = computed(() => this.fishes().filter(f => f.location == this.config.defaultLocation));
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
  }

}
