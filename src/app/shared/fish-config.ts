import { InjectionToken } from '@angular/core';

export interface FishConfig {
  apiBaseUrl: string;
  defaultLocation: string;
}

export const FISH_CONFIG = new InjectionToken<FishConfig>('fish.config');
