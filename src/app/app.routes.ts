import { Routes } from '@angular/router';
import { FishList } from './fish-list/fish-list';
import { FishDetail } from './fish-detail/fish-detail';
import { FishForm } from './fish-form/fish-form';
import {toggleGuard} from './auth';

export const routes: Routes = [
  { path: '', redirectTo: '/fish', pathMatch: 'full' },
  { path: 'fish', component: FishList },
  { path: 'fish/:id', component: FishDetail },
  { path: 'form', component: FishForm },
  { path: 'fish/edit/:id', component: FishForm, canActivate: [toggleGuard] },
];
