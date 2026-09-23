import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Fish } from './shared/models/fish';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})

export class App {
  title = 'FFXIV Fish Log';

  fishList: Fish[] = [
    { id: 1, name: 'Fish 1', location: 'Place', weather: 'Raining', time: '22:00' }, // FFXIV uses 24-hour time notation
    { id: 2, name: 'Fish 2', location: 'Place' }, // Testing out optional variables
    { id: 3, name: "Fish 3", location: "Place 2", time: "12:00" }, // Testing out different quotes, union alternates
    { id: 4, name: 'Fish 4', location: 'Place 2' },
    { id: 5, name: 'Fish 5', location: 'Place 3' },
    { id: 6, name: 'Fish 6', location: 'Place 4' },
  ];
} // Don't even know if this is what the assignment instructions meant
