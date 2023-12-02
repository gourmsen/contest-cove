// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// services
import { ContestListService } from '../contest-list.service';
import { SharedDataService } from '../shared-data.service';

// interfaces
import { ContestListResponse } from '../contest-list-response';


@Component({
  selector: 'app-contest-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contest-list.component.html',
  styleUrl: './contest-list.component.css'
})
export class ContestListComponent {
  contestListResponseBody: ContestListResponse;

  userId: string;

  constructor(
    private contestListService: ContestListService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit() {
    this.contestListService.listContests()
      .subscribe(
        (ContestListResponse) => {
          this.contestListResponseBody = ContestListResponse.body!;
        },
        (error) => {

        }
      );
    
    this.sharedDataService.getCookieUserId()
      .subscribe(userId => {
        this.userId = userId;
      });
  }
}
