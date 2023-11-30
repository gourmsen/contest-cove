import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private cookieName = new BehaviorSubject("");

  constructor(private cookieService: CookieService) {
    this.cookieName.next(cookieService.get("name"));
  }

  getCookieName() {
    return this.cookieName.asObservable();
  }

  setCookieName(value: string) {
    this.cookieService.set("name", value);
    this.cookieName.next(value);
  }
}
