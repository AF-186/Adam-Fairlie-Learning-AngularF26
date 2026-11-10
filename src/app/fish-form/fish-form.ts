import {Component, computed, effect, inject, input} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FishService } from '../services/fish';
import { Router } from '@angular/router';

@Component({
  imports: [
    ReactiveFormsModule
  ],
  selector: 'app-fish-form',
  styleUrl: './fish-form.scss',
  templateUrl: './fish-form.html',
})
export class FishForm {
  private fb = inject(FormBuilder); // Step 10
  private service = inject(FishService);
  private router = inject(Router);

  id = input<number>();

  protected isEditMode = computed(() => this.id() !== undefined);
  // Step 18

  protected fishForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]], // Step 11a, 11b
    location: ['', [Validators.required, Validators.minLength(3)]], // Step 11a
    weather: [''],
    time: [''],
  });

  constructor() {
    effect(() => {
      const id = this.id();
      if (id === undefined) {
        return;
      }
      const fish = this.service.getFish(Number(id));
      if (fish) {
        this.fishForm.patchValue({ ...fish, weather: fish.weather ?? '', time: fish.time ?? '' });
      }
    });
  }

  protected onSubmit() : void {
    if (this.fishForm.invalid) return;

    const formValue = this.fishForm.getRawValue();
    const id = this.isEditMode() ? Number(this.id()) : this.service.nextId();

    if (this.isEditMode()) {
      this.service.updateFish({ id, ...formValue });
    } else {
      this.service.addFish({id, ...formValue});
    }

    this.fishForm.reset();
    this.router.navigate(['/fish', id]);
  }
}
