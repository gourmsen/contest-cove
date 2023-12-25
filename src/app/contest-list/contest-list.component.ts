// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// router
import { RouterLink } from '@angular/router';

// services
import { SharedDataService } from '../shared-data.service';
import { ContestListService } from '../contest-list.service';
import { ContestAttendeeListService } from '../contest-attendee-list.service';

// interfaces
import { ContestListResponse } from '../contest-list-response';
import { ContestAttendeeListResponse } from '../contest-attendee-list-response';


@Component({
  selector: 'app-contest-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './contest-list.component.html',
  styleUrl: './contest-list.component.css'
})
export class ContestListComponent {
  contestListResponseBody: ContestListResponse;
  contestAttendeeListResponseBody: ContestAttendeeListResponse;

  userId: string;
  
  attendeeCount: number[] = [];
  isAttendee: boolean[] = [];

  constructor(
    private sharedDataService: SharedDataService,
    private contestListService: ContestListService,
    private contestAttendeeListService: ContestAttendeeListService
  ) {}

  ngOnInit() {

    // get userId
    this.sharedDataService.getCookieUserId().subscribe(userId => {
      this.userId = userId;

      // get list of contests
      this.contestListService.listContests().subscribe(
        (contestListResponse) => {
          this.contestListResponseBody = contestListResponse.body!;

          for (let i = 0; i < this.contestListResponseBody.data.contests.length; i++) {

            // display date in short form
            this.contestListResponseBody.data.contests[i].creationDate = this.contestListResponseBody.data.contests[i].creationDate.substring(0, 10);

            // get attendees per contest
            this.contestAttendeeListService.listContestAttendees(this.contestListResponseBody.data.contests[i].contestId).subscribe(
              (contestAttendeeListResponse) => {
                this.contestAttendeeListResponseBody = contestAttendeeListResponse.body!;

                // store attendee count
                this.attendeeCount[i] = this.contestAttendeeListResponseBody.data.attendees.length;

                // check user attendance
                this.isAttendee[i] = false;
                for (let j = 0; j < this.contestAttendeeListResponseBody.data.attendees.length; j++) {
                  if (this.contestAttendeeListResponseBody.data.attendees[j].attendeeId === this.userId) {
                    this.isAttendee[i] = true;
                    break;
                  }
                }
              },
              (error) => {
                if (error.status === 404) {
                  this.attendeeCount[i] = 0;
                  this.isAttendee[i] = false;
                }
              });
          }
        },
        (error) => {
          if (error.status === 404) {}
        });
    });
  }
}
