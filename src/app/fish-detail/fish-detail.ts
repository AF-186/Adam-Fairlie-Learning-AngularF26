import { Component, input, computed, inject } from '@angular/core';
import { FishService } from '../services/fish';

@Component({
  imports: [],
  selector: 'app-fish-detail',
  styleUrl: './fish-detail.scss',
  templateUrl: './fish-detail.html',
})
export class FishDetail {
  id = input.required<string>();

  private service = inject(FishService);

  fish = computed(() =>
    this.service.fishList().find(f => f.id === Number(this.id()))
    // Too many layers
  );
}
