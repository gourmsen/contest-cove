// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// router
import { Router, RouterLink } from '@angular/router';

// services
import { SharedDataService } from '../shared-data.service';
import { ContestListService } from '../contest-list.service';
import { ContestAttendeeListService } from '../contest-attendee-list.service';
import { ContestJoinService } from '../contest-join.service';
import { ContestLeaveService } from '../contest-leave.service';

// interfaces
import { ContestListResponse } from '../contest-list-response';
import { ContestAttendeeListResponse } from '../contest-attendee-list-response';
import { ContestJoinRequest } from '../contest-join-request';
import { ContestJoinResponse } from '../contest-join-response';
import { ContestLeaveResponse } from '../contest-leave-response';


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
  contestJoinResponseBody: ContestJoinResponse;
  contestLeaveResponseBody: ContestLeaveResponse;

  userId: string;
  
  attendeeCount: number[] = [];
  isAttendee: boolean[] = [];

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private contestListService: ContestListService,
    private contestAttendeeListService: ContestAttendeeListService,
    private contestJoinService: ContestJoinService,
    private contestLeaveService: ContestLeaveService
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

  joinContest(contestId: string, attendeeId: string) {

    // prepare request
    let contestJoinRequest: ContestJoinRequest = {
      contestId: contestId,
      attendeeId: attendeeId,
    }

    // join contest
    this.contestJoinService.joinContest(contestJoinRequest).subscribe(
      (contestJoinResponse) => {
        this.contestJoinResponseBody = contestJoinResponse.body!;
      },
      (error) => {
        if (error.status === 409) {}
      });
    
    // refresh page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['contests']);
    }); 
  }

  leaveContest(contestId: string, attendeeId: string) {

    // leave contest
    this.contestLeaveService.leaveContest(contestId, attendeeId).subscribe(
      (contestLeaveResponse) => {
        this.contestLeaveResponseBody = contestLeaveResponse.body!;
      },
      (error) => {
        if (error.status === 404) {}
      });
    
    // refresh page
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['contests']);
    }); 
  }
}
