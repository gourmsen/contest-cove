import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private cookieTokenId = new BehaviorSubject("");
  private cookieUserId = new BehaviorSubject("");
  private cookieName = new BehaviorSubject("");

  constructor(private cookieService: CookieService) {
    this.cookieTokenId.next(cookieService.get("tokenId"));
    this.cookieUserId.next(cookieService.get("userId"));
    this.cookieName.next(cookieService.get("name"));
  }

  getCookieTokenId() {
    return this.cookieTokenId.asObservable();
  }

  setCookieTokenId(value: string) {
    this.setCookie("tokenId", value);
    this.cookieTokenId.next(value);
  }

  getCookieUserId() {
    return this.cookieUserId.asObservable();
  }

  setCookieUserId(value: string) {
    this.setCookie("userId", value);
    this.cookieUserId.next(value);
  }

  getCookieName() {
    return this.cookieName.asObservable();
  }

  setCookieName(value: string) {
    this.setCookie("name", value);
    this.cookieName.next(value);
  }

  setCookie(name: string, value: string) {
    if (value === "") {
      this.cookieService.delete(name);
    } else {
      this.cookieService.set(name, value, 7);
    }
  }
}
