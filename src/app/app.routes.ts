import { Routes } from '@angular/router';
import { FishList } from './fish-list/fish-list';
import { FishDetail } from './fish-detail/fish-detail';
import { FishForm } from './fish-form/fish-form';

export const routes: Routes = [
  { path: '', component: FishList },
  { path: 'fish/:id', component: FishDetail },
  { path: 'form', component: FishForm },
];
