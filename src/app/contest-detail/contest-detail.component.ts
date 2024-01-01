// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// router
import { ActivatedRoute } from '@angular/router';

// services
import { ContestDetailService } from '../contest-detail.service';
import { ContestAttendeeListService } from '../contest-attendee-list.service';

// interfaces
import { ContestDetailResponse } from '../contest-detail-response';
import { ContestAttendeeListResponse } from '../contest-attendee-list-response';

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

  contestId: string;

  sortedAttendees: any[][] = [];

  constructor(
    private route: ActivatedRoute,
    private contestDetailService: ContestDetailService,
    private contestAttendeeListService: ContestAttendeeListService
  ) {}

  ngOnInit() {
    this.contestId = this.route.snapshot.paramMap.get("contestId") || "";

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
        )
      },
      (error) => {
        if (error.status === 404) {}
      }
    );
  }

  sortContestAttendees(attendees: any[], maxRound: number) {

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
}
