import {Component, inject, signal} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Fish } from './shared/models/fish';
import {FishList} from './fish-list/fish-list';
import {Auth} from './auth';

@Component({
  imports: [RouterOutlet, FishList, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})

export class App {
  protected authGuard = inject(Auth);
}
