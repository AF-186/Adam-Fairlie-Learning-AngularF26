import {Component, computed, inject, input} from '@angular/core';
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

  //protected isEditMode = computed(() => this.id() !== undefined);

  fishForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]], // Step 11a, 11b
    location: ['', [Validators.required, Validators.minLength(3)]], // Step 11a
    weather: [''],
  });

   onSubmit() : void {
    if (this.fishForm.invalid) return;

    const formValue = this.fishForm.getRawValue();

    // const id = this.isEditMode() ? Number(this.id()) : this.service.nextId();
    //
    // if (this.isEditMode()) {
    //
    // } else {
    //   this.service.addFish({id, ...formValue});
    // }

     const id = this.service.nextId();
     this.service.addFish({id, ...formValue});
     this.fishForm.reset();

  }
}
