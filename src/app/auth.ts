import {inject, Service, signal} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

@Service()
export class Auth {
  guardEnabled = signal(false);
  toggle() : void {
    this.guardEnabled.update(c => !c);
  }
}

export const toggleGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authGuard = inject(Auth);

  return authGuard.guardEnabled() ? true : router.createUrlTree(['/fish']);
}
