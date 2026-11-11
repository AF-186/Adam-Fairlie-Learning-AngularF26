import {Component, computed, effect, inject, input} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl, ValidationErrors
} from '@angular/forms';
import { FishService } from '../services/fish';
import { Router } from '@angular/router';
import {ValidationError} from '@angular/forms/signals';

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
  testReg = /@/i;

  protected fishForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), noSymbolValidator()]], // Step 11a, 11b
    description: ['', Validators.required],
    location: ['', [Validators.required, Validators.minLength(3)]], // Step 11a
    icon: [''],
  },
    { validators: crossFieldValidator });

  constructor() {
    effect(() => {
      const id = this.id();
      if (id === undefined) {
        return;
      }
      const fish = this.service.getFish(Number(id));
      if (fish) {
        this.fishForm.patchValue({ ...fish });
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
export function noSymbolValidator() : ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const specialChar = /[^\w\s]/gi.test(value);
    const noSpecialValid = !specialChar;
    return !noSpecialValid ? { noSpecial: true } : null;
  }
}

export const crossFieldValidator : ValidatorFn = (myTest: AbstractControl): ValidationErrors | null => {
  const name = String(myTest.get('name')?.value ?? '').toLowerCase();
  const location = String(myTest.get('location')?.value ?? '').toLowerCase();

  let diff = name !== location;
  return !diff ? { nameDiff: true }: null;
}
