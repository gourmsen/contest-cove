import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedDataService } from './internal-services/shared-data.service';

export const authGuard: CanActivateFn = (route, state) => {
  let sharedDataService = inject(SharedDataService);
  let router = inject(Router);

  let isAuthorized = false;

  sharedDataService.getCookieTokenId().subscribe(
    (tokenId) => {
      if (tokenId !== "") {
        isAuthorized = true;
      } else {
        isAuthorized = false;
        router.navigate(["/sign-in"]);
      }
    }
  );

  return isAuthorized;
};
