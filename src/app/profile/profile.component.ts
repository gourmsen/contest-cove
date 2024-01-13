import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../internal-services/shared-data.service';
import { SignOutService } from '../internal-services/sign-out.service';

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

  constructor(
    private sharedDataService: SharedDataService,
    private signOutService: SignOutService
  ) {}

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
    this.signOutService.signOut();
  }
}
