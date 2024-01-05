// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// router
import { ActivatedRoute } from '@angular/router';

// services
import { SharedDataService } from '../shared-data.service';
import { SocketService } from '../socket.service';
import { ContestDetailService } from '../contest-detail.service';
import { ContestAttendeeListService } from '../contest-attendee-list.service';
import { ContestObjectiveListService } from '../contest-objective-list.service';
import { ContestAttendeeEntryNewService } from '../contest-attendee-entry-new.service';
import { ContestAttendeeEntryListService } from '../contest-attendee-entry-list.service';

// interfaces
import { ContestDetailResponse } from '../contest-detail-response';
import { ContestAttendeeListResponse } from '../contest-attendee-list-response';
import { ContestObjectiveListResponse } from '../contest-objective-list-response';
import { ContestAttendeeEntryNewRequest } from '../contest-attendee-entry-new-request';
import { ContestAttendeeEntryNewResponse } from '../contest-attendee-entry-new-response';
import { ContestAttendeeEntryListResponse } from '../contest-attendee-entry-list-response';

@Component({
  selector: 'app-contest-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contest-detail.component.html',
  styleUrl: './contest-detail.component.css'
})
export class ContestDetailComponent {
  contestDetailResponseBody: ContestDetailResponse;
  contestAttendeeListResponseBody: ContestAttendeeListResponse;
  contestObjectiveListResponseBody: ContestObjectiveListResponse;
  contestAttendeeEntryNewResponseBody: ContestAttendeeEntryNewResponse;
  contestAttendeeEntryListResponseBody: ContestAttendeeEntryListResponse;

  contestId: string;
  userId: string;

  sortedAttendees: any[][] = [];
  
  entryValues: number[] = [];
  overallEntrySum: number = 0;

  isSocketConnected: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private socketService: SocketService,
    private contestDetailService: ContestDetailService,
    private contestAttendeeListService: ContestAttendeeListService,
    private contestObjectiveListService: ContestObjectiveListService,
    private contestAttendeeEntryNewService: ContestAttendeeEntryNewService,
    private contestAttendeeEntryListService: ContestAttendeeEntryListService
  ) {}

  ngOnInit() {
    this.contestId = this.route.snapshot.paramMap.get("contestId") || "";

    // connect to web-socket
    this.socketService.connect().subscribe(
      (message) => {
        let parsedMessage = JSON.parse(JSON.stringify(message));

        if (parsedMessage.event === "socket-connect") {
          this.isSocketConnected = true;
        }

        if (parsedMessage.event === "contest-attendee-entry-new") {

          // get contest attendee entries
          this.contestAttendeeEntryListService.listContestAttendeeEntries(this.contestId).subscribe(
            (contestAttendeeEntryListResponse) => {
              this.contestAttendeeEntryListResponseBody = contestAttendeeEntryListResponse.body!;
            },
            (error) => {
              if (error.status === 404) {}
            }
          );

          // get attendee list
          this.contestAttendeeListService.listContestAttendees(this.contestId).subscribe(
            (contestAttendeeListResponse) => {
              this.contestAttendeeListResponseBody = contestAttendeeListResponse.body!;

              this.sortContestAttendees(this.contestAttendeeListResponseBody.data.attendees, this.contestDetailResponseBody.data.currentRound);
            },
            (error) => {
              if (error.status === 404) {}
            }
          );
        }
      },
      (error) => {},
      () => {
        this.isSocketConnected = false;
      }
    );
    
    // get userId
    this.sharedDataService.getCookieUserId().subscribe(userId => {
      this.userId = userId;

      // get contest details
      this.contestDetailService.viewContest(this.contestId).subscribe(
        (contestDetailResponse) => {
          this.contestDetailResponseBody = contestDetailResponse.body!;

          // get attendee list
          this.contestAttendeeListService.listContestAttendees(this.contestId).subscribe(
            (contestAttendeeListResponse) => {
              this.contestAttendeeListResponseBody = contestAttendeeListResponse.body!;

              this.sortContestAttendees(this.contestAttendeeListResponseBody.data.attendees, this.contestDetailResponseBody.data.currentRound)
            },
            (error) => {
              if (error.status === 404) {}
            }
          );
        },
        (error) => {
          if (error.status === 404) {}
        }
      );
    });


    // get contest objectives
    this.contestObjectiveListService.listContestObjectives(this.contestId).subscribe(
      (contestObjectiveListResponse) => {
        this.contestObjectiveListResponseBody = contestObjectiveListResponse.body!;

        if (!this.entryValues.length) {
          this.entryValues = Array(this.contestObjectiveListResponseBody.data.objectives.length).fill(0);
        }
      },
      (error) => {
        if (error.status === 404) {}
      }
    );

    // get contest attendee entries
    this.contestAttendeeEntryListService.listContestAttendeeEntries(this.contestId).subscribe(
      (contestAttendeeEntryListResponse) => {
        this.contestAttendeeEntryListResponseBody = contestAttendeeEntryListResponse.body!;
      },
      (error) => {
        if (error.status === 404) {}
      }
    );
  }

  sortContestAttendees(attendees: any[], maxRound: number) {

    // initialize array
    this.sortedAttendees = [];

    // sort array for each round
    for (let i = 0; i < maxRound + 1; i++) {

      // explicitly create a copy of the attendees array
      let sortedAttendees = [...attendees];

      // sort based on places
      sortedAttendees.sort((a: any, b: any) => {
        return a.places[i] - b.places[i];
      });

      this.sortedAttendees.push([...sortedAttendees]);
    }
  }

  entryLess(objectiveIndex: number) {
    if (this.entryValues[objectiveIndex] > 0) {
      this.entryValues[objectiveIndex]--;
    }

    this.calculateOverallEntry();
  }

  entryMore(objectiveIndex: number) {
    if (this.entryValues[objectiveIndex] < 20) {
      this.entryValues[objectiveIndex]++;
    }

    this.calculateOverallEntry();
  }

  calculateOverallEntry() {
    this.overallEntrySum = 0;
    for (let i = 0; i < this.contestObjectiveListResponseBody.data.objectives.length; i++) {
      this.overallEntrySum += this.entryValues[i] * this.contestObjectiveListResponseBody.data.objectives[i].value;
    }
  }

  logEntry() {
    let contestAttendeeEntryNewRequest: ContestAttendeeEntryNewRequest = {
      contestId: this.contestId,
      attendeeId: this.userId,
      values: this.entryValues
    }

    this.contestAttendeeEntryNewService.logContestEntry(contestAttendeeEntryNewRequest).subscribe(
      (contestAttendeeEntryNewResponse) => {
        this.contestAttendeeEntryNewResponseBody = contestAttendeeEntryNewResponse.body!;
      },
      (error) => {
        if (error.status === 404) {}
      }
    );

    // empty values
    for (let i = 0; i < this.entryValues.length; i++) {
      this.entryValues[i] = 0;
    }

    this.overallEntrySum = 0;
  }
}

