import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FISH_CONFIG } from './shared/fish-config';
import { FishService } from './services/fish';
import { MockFishService } from './services/fish-mock';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: FISH_CONFIG,
    useValue: {
      apiBaseUrl: 'https://placeholder.example.com/api',
      defaultLocation: 'Place 2',
    } },
    { provide: FishService, useClass: MockFishService }
  ]
};
