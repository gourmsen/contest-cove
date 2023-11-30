import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  tokenId: string;
  userId: string;
  name: string;

  constructor(private sharedDataService: SharedDataService) {}

  ngOnInit() {
    this.sharedDataService.getCookieTokenId().subscribe(tokenId => {
      this.tokenId = tokenId;
    });

    this.sharedDataService.getCookieUserId().subscribe(userId => {
      this.userId = userId;
    });

    this.sharedDataService.getCookieName().subscribe(name => {
      this.name = name;
    });
  }

  signOut() {
    this.sharedDataService.setCookieTokenId("");
    this.sharedDataService.setCookieUserId("");
    this.sharedDataService.setCookieName("");
  }
}