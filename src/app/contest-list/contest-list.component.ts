// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// router
import { Router, RouterLink } from '@angular/router';

// services
import { SharedDataService } from '../internal-services/shared-data.service';
import { ContestListService } from '../http-services/contest-list.service';
import { ContestAttendeeListService } from '../http-services/contest-attendee-list.service';
import { ContestJoinService } from '../http-services/contest-join.service';
import { ContestLeaveService } from '../http-services/contest-leave.service';
import { ContestUpdateService } from '../http-services/contest-update.service';
import { ContestDeleteService } from '../http-services/contest-delete.service';

// interfaces
import { ContestSchema } from '../interfaces/contest-schema';
import { ContestListResponse } from '../interfaces/contest-list-response';
import { ContestAttendeeListResponse } from '../interfaces/contest-attendee-list-response';
import { ContestJoinRequest } from '../interfaces/contest-join-request';
import { ContestJoinResponse } from '../interfaces/contest-join-response';
import { ContestLeaveResponse } from '../interfaces/contest-leave-response';
import { ContestUpdateRequest } from '../interfaces/contest-update-request';
import { ContestUpdateResponse } from '../interfaces/contest-update-response';
import { ContestDeleteResponse } from '../interfaces/contest-delete-response';


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
  contestUpdateResponseBody: ContestUpdateResponse;
  contestDeleteResponseBody: ContestDeleteResponse;

  userId: string;
  
  attendeeCount: number[] = [];
  isAttendee: boolean[] = [];

  constructor(
    private router: Router,
    private sharedDataService: SharedDataService,
    private contestListService: ContestListService,
    private contestAttendeeListService: ContestAttendeeListService,
    private contestJoinService: ContestJoinService,
    private contestLeaveService: ContestLeaveService,
    private contestUpdateService: ContestUpdateService,
    private contestDeleteService: ContestDeleteService
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
    
      this.refreshPage();
  }

  startContest(contestId: string) {
    let contest = this.findContest(contestId);

    if (contest) {
      contest.state = "Started";

      this.updateContest(contest);
    }
    
    this.refreshPage();
  }

  nextRound(contestId: string) {
    let contest = this.findContest(contestId);

    if (contest) {
      contest.currentRound++;

      this.updateContest(contest);
    }
    
    this.refreshPage();
  }

  closeContest(contestId: string) {
    let contest = this.findContest(contestId);

    if (contest) {
      contest.state = "Closed";

      this.updateContest(contest);
    }
    
    this.refreshPage();
  }

  deleteContest(contestId: string, attendeeId: string) {

    // delete contest
    this.contestDeleteService.deleteContest(contestId, attendeeId).subscribe(
      (contestDeleteResponse) => {
        this.contestDeleteResponseBody = contestDeleteResponse.body!;
      },
      (error) => {
        if (error.status === 401) {}
        if (error.status === 404) {}
      }
    );

    this.refreshPage();
  }

  findContest(contestId: string) {
    let contest: ContestSchema | null = null;
    for (let i = 0; i < this.contestListResponseBody.data.contests.length; i++) {
      if (this.contestListResponseBody.data.contests[i].contestId === contestId) {
        contest = this.contestListResponseBody.data.contests[i];
      }
    }

    return contest;
  }

  updateContest(contest: ContestSchema) {
    let contestUpdateRequest: ContestUpdateRequest = {
      contest: contest
    }

    this.contestUpdateService.updateContest(contestUpdateRequest).subscribe(
      (contestUpdateResponse) => {
        this.contestUpdateResponseBody = contestUpdateResponse.body!;
      },
      (error) => {}
    );
  }

  refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['contests']);
    }); 
  }
}
