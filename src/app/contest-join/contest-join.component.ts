// basic component
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

// router
import { Router, ActivatedRoute } from "@angular/router";

// services
import { SharedDataService } from "../internal-services/shared-data.service";
import { ContestAttendeeListService } from "../http-services/contest-attendee-list.service";
import { ContestJoinService } from "../http-services/contest-join.service";

// interfaces
import { ContestAttendeeListResponse } from "../interfaces/contest-attendee-list-response";
import { ContestJoinRequest } from "../interfaces/contest-join-request";
import { ContestJoinResponse } from "../interfaces/contest-join-response";

@Component({
    selector: "app-contest-join",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./contest-join.component.html",
    styleUrl: "./contest-join.component.css",
})
export class ContestJoinComponent {
    contestAttendeeListResponseBody: ContestAttendeeListResponse;
    contestJoinResponseBody: ContestJoinResponse;

    contestId: string;
    userId: string;

    loadingAttendees: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private sharedDataService: SharedDataService,
        private contestAttendeeListService: ContestAttendeeListService,
        private contestJoinService: ContestJoinService
    ) {}

    ngOnInit() {
        this.contestId = this.route.snapshot.paramMap.get("contestId") || "";

        // loading
        this.loadingAttendees = true;

        // get userId
        this.sharedDataService.getCookieUserId().subscribe((userId) => {
            this.userId = userId;

            // get attendeeList
            this.contestAttendeeListService.listContestAttendees(this.contestId).subscribe(
                (contestAttendeeListResponse) => {
                    this.contestAttendeeListResponseBody = contestAttendeeListResponse.body!;

                    // check for attendee
                    this.contestAttendeeListResponseBody.data.attendees.forEach((attendee) => {
                        if (attendee.attendeeId === this.userId) {
                            this.navigateToContest(this.contestId);
                        }
                    });

                    this.loadingAttendees = false;
                },
                (error) => {
                    if (error.status === 404) {
                    }

                    this.loadingAttendees = false;
                }
            );
        });
    }

    joinContest(contestId: string, attendeeId: string) {
        // prepare request
        let contestJoinRequest: ContestJoinRequest = {
            contestId: contestId,
            attendeeId: attendeeId,
        };

        // join contest
        this.contestJoinService.joinContest(contestJoinRequest).subscribe(
            (contestJoinResponse) => {
                this.contestJoinResponseBody = contestJoinResponse.body!;
            },
            (error) => {
                if (error.status === 409) {
                }
            }
        );

        this.navigateToContest(contestId);
    }

    navigateToContest(contestId: string) {
        // navigate to contest
        this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
            this.router.navigate(["contests/" + contestId]);
        });
    }
}
