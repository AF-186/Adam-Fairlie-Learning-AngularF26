import { Routes } from '@angular/router';
import {FishList} from './fish-list/fish-list';
import {FishDetail} from './fish-detail/fish-detail';

export const routes: Routes = [
  { path: 'fish', component: FishList },
  { path: 'fish/:id', component: FishDetail },
];
