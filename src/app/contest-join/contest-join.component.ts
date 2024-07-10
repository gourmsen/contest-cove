// basic component
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

// router
import { ActivatedRoute } from "@angular/router";

// services
import { SharedDataService } from "../internal-services/shared-data.service";
import { ContestAttendeeListService } from "../http-services/contest-attendee-list.service";

// interfaces
import { ContestAttendeeListResponse } from "../interfaces/contest-attendee-list-response";

@Component({
    selector: "app-contest-join",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./contest-join.component.html",
    styleUrl: "./contest-join.component.css",
})
export class ContestJoinComponent {
    contestAttendeeListResponseBody: ContestAttendeeListResponse;

    contestId: string;
    userId: string;

    isAttendee: boolean;

    constructor(
        private route: ActivatedRoute,
        private sharedDataService: SharedDataService,
        private contestAttendeeListService: ContestAttendeeListService
    ) {}

    ngOnInit() {
        this.contestId = this.route.snapshot.paramMap.get("contestId") || "";

        // get userId
        this.sharedDataService.getCookieUserId().subscribe((userId) => {
            this.userId = userId;

            // get attendeeList
            this.isAttendee = false;
            this.contestAttendeeListService.listContestAttendees(this.contestId).subscribe(
                (contestAttendeeListResponse) => {
                    this.contestAttendeeListResponseBody = contestAttendeeListResponse.body!;

                    // check for attendee
                    this.contestAttendeeListResponseBody.data.attendees.forEach((attendee) => {
                        if (attendee.attendeeId === this.userId) {
                            this.isAttendee = true;
                        }
                    });
                },
                (error) => {
                    if (error.status === 404) {
                        this.isAttendee = false;
                    }
                }
            );
        });
    }
}
