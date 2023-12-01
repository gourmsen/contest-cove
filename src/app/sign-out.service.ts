import { Injectable } from '@angular/core';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class SignOutService {
  constructor(private sharedDataService: SharedDataService) {}

  signOut() {

    // delete all shared data and cookies
    this.sharedDataService.setCookieTokenId("");
    this.sharedDataService.setCookieUserId("");
    this.sharedDataService.setCookieName("");
  }
}
