// basic component
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

// router
import { ActivatedRoute } from "@angular/router";

// other
import { interval, Subscription } from "rxjs";

// services
import { SharedDataService } from "../internal-services/shared-data.service";
import { SocketService } from "../http-services/socket.service";
import { ContestDetailService } from "../http-services/contest-detail.service";
import { ContestAttendeeListService } from "../http-services/contest-attendee-list.service";
import { ContestObjectiveListService } from "../http-services/contest-objective-list.service";
import { ContestEntryNewService } from "../http-services/contest-entry-new.service";
import { ContestEntryListService } from "../http-services/contest-entry-list.service";
import { ContestTeamsNewService } from "../http-services/contest-teams-new.service";
import { ContestTeamListService } from "../http-services/contest-team-list.service";
import { ContestTeamsUpdateService } from "../http-services/contest-teams-update.service";
import { ContestTimerDetailService } from "../http-services/contest-timer-detail.service";
import { ContestTimerNewService } from "../http-services/contest-timer-new.service";
import { ContestEntryDeleteService } from "../http-services/contest-entry-delete.service";
import { TimerService } from "../internal-services/timer.service";

// interfaces
import { ContestDetailResponse } from "../interfaces/contest-detail-response";
import { ContestAttendeeListResponse } from "../interfaces/contest-attendee-list-response";
import { ContestObjectiveListResponse } from "../interfaces/contest-objective-list-response";
import { ContestEntryNewRequest } from "../interfaces/contest-entry-new-request";
import { ContestEntryNewResponse } from "../interfaces/contest-entry-new-response";
import { ContestEntryListResponse } from "../interfaces/contest-entry-list-response";
import { ContestTeamsNewRequest } from "../interfaces/contest-teams-new-request";
import { ContestTeamsNewResponse } from "../interfaces/contest-teams-new-response";
import { ContestTeamListResponse } from "../interfaces/contest-team-list-response";
import { ContestTeamsUpdateRequest } from "../interfaces/contest-teams-update-request";
import { ContestTeamsUpdateResponse } from "../interfaces/contest-teams-update-response";
import { ContestEntryDeleteResponse } from "../interfaces/contest-entry-delete-response";
import { ContestTimerDetailResponse } from "../interfaces/contest-timer-detail-response";
import { ContestTimerNewRequest } from "../interfaces/contest-timer-new-request";
import { ContestTimerNewResponse } from "../interfaces/contest-timer-new-response";

@Component({
    selector: "app-contest-detail",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./contest-detail.component.html",
    styleUrl: "./contest-detail.component.css",
})
export class ContestDetailComponent {
    contestDetailResponseBody: ContestDetailResponse;
    contestAttendeeListResponseBody: ContestAttendeeListResponse;
    contestObjectiveListResponseBody: ContestObjectiveListResponse;
    contestEntryNewResponseBody: ContestEntryNewResponse;
    contestEntryListResponseBody: ContestEntryListResponse;
    contestTeamListResponseBody: ContestTeamListResponse;
    contestTeamsNewResponseBody: ContestTeamsNewResponse;
    contestTeamsUpdateResponseBody: ContestTeamsUpdateResponse;
    contestEntryDeleteResponseBody: ContestEntryDeleteResponse;
    contestTimerDetailResponseBody: ContestTimerDetailResponse | null;
    contestTimerNewResponseBody: ContestTimerNewResponse;

    loadingAttendees: boolean;
    loadingObjectives: boolean;
    loadingEntries: boolean;
    loadingTeams: boolean;
    loadingTimer: boolean;

    contestId: string;
    userId: string;

    remainingTime: any[];
    duration: number;
    timer: Subscription;

    sortedAttendees: any[][] = [];

    entryValues: number[] = [];
    overallEntrySum: number = 0;

    teamSizes: number[] = [];
    overallSizeSum: number = 0;

    buttonTeamUpdateClicked: boolean;

    isSocketConnected: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private sharedDataService: SharedDataService,
        private socketService: SocketService,
        private contestDetailService: ContestDetailService,
        private contestAttendeeListService: ContestAttendeeListService,
        private contestObjectiveListService: ContestObjectiveListService,
        private contestEntryNewService: ContestEntryNewService,
        private contestEntryListService: ContestEntryListService,
        private contestTeamsNewService: ContestTeamsNewService,
        private contestTeamListService: ContestTeamListService,
        private contestTeamsUpdateService: ContestTeamsUpdateService,
        private contestEntryDeleteService: ContestEntryDeleteService,
        private contestTimerDetailService: ContestTimerDetailService,
        private contestTimerNewService: ContestTimerNewService,
        private timerService: TimerService
    ) {}

    ngOnInit() {
        this.contestId = this.route.snapshot.paramMap.get("contestId") || "";
        this.duration = 45;

        // loading
        this.loadingAttendees = true;
        this.loadingObjectives = true;
        this.loadingEntries = true;
        this.loadingTeams = true;
        this.loadingTimer = true;

        // button clicks
        this.buttonTeamUpdateClicked = false;

        /*
        <----- GET WEB-SOCKET DATA ----->
        */

        // connect to web-socket
        this.socketService.connect().subscribe(
            (message) => {
                let parsedMessage = JSON.parse(JSON.stringify(message));

                if (parsedMessage.event === "socket-connect") {
                    this.isSocketConnected = true;
                }

                if (parsedMessage.event === "contest-update") {
                    // clean up timer
                    this.contestTimerDetailResponseBody = null;
                }

                if (
                    parsedMessage.event === "contest-entry-new" ||
                    parsedMessage.event === "contest-entry-delete" ||
                    parsedMessage.event === "contest-update" ||
                    parsedMessage.event === "contest-join" ||
                    parsedMessage.event === "contest-leave"
                ) {
                    // get contest attendee entries
                    this.loadingEntries = true;
                    this.contestEntryListService.listContestEntries(this.contestId).subscribe(
                        (contestEntryListResponse) => {
                            this.contestEntryListResponseBody = contestEntryListResponse.body!;

                            this.loadingEntries = false;
                        },
                        (error) => {
                            if (error.status === 404) {
                            }

                            this.loadingEntries = false;
                        }
                    );

                    // get contest details
                    this.contestDetailService.viewContest(this.contestId).subscribe(
                        (contestDetailResponse) => {
                            this.contestDetailResponseBody = contestDetailResponse.body!;

                            // get attendee list
                            this.loadingAttendees = true;
                            this.contestAttendeeListService.listContestAttendees(this.contestId).subscribe(
                                (contestAttendeeListResponse) => {
                                    this.contestAttendeeListResponseBody = contestAttendeeListResponse.body!;

                                    this.sortContestAttendees(
                                        this.contestAttendeeListResponseBody.data.attendees,
                                        this.contestDetailResponseBody.data.currentRound
                                    );

                                    this.loadingAttendees = false;

                                    // get team list
                                    this.loadingTeams = true;
                                    this.contestTeamListService.listContestTeams(this.contestId).subscribe(
                                        (contestTeamListResponse) => {
                                            this.contestTeamListResponseBody = contestTeamListResponse.body!;

                                            this.loadingTeams = false;
                                        },
                                        (error) => {
                                            this.loadingTeams = false;
                                        }
                                    );
                                },
                                (error) => {
                                    if (error.status === 404) {
                                    }

                                    this.loadingAttendees = false;
                                }
                            );
                        },
                        (error) => {
                            if (error.status === 404) {
                            }
                        }
                    );
                }

                if (parsedMessage.event === "contest-teams-new" || parsedMessage.event === "contest-teams-update") {
                    // get team list
                    this.loadingTeams = true;
                    this.contestTeamListService.listContestTeams(this.contestId).subscribe(
                        (contestTeamListResponse) => {
                            this.contestTeamListResponseBody = contestTeamListResponse.body!;

                            this.loadingTeams = false;
                        },
                        (error) => {
                            this.loadingTeams = false;
                        }
                    );
                }

                if (parsedMessage.event === "contest-timer-new") {
                    this.loadingTimer = true;

                    // get round timer
                    let currentRound = this.contestDetailResponseBody.data.currentRound;
                    this.contestTimerDetailService.viewContestTimer(this.contestId, currentRound).subscribe(
                        (contestTimerDetailResponse) => {
                            this.contestTimerDetailResponseBody = contestTimerDetailResponse.body!;

                            let start: string = this.contestTimerDetailResponseBody.data.start;
                            let duration: number = this.contestTimerDetailResponseBody.data.duration;
                            this.startTimer(start, duration);

                            this.loadingTimer = false;
                        },
                        (error) => {
                            if (error.status === 404) {
                            }
                            if (error.status === 400) {
                            }
                            this.loadingTimer = false;
                        }
                    );
                }
            },
            (error) => {},
            () => {
                this.isSocketConnected = false;
            }
        );

        /*
        <----- GET HTTP DATA ----->
        */

        // get userId
        this.sharedDataService.getCookieUserId().subscribe((userId) => {
            this.userId = userId;

            // get contest details
            this.contestDetailService.viewContest(this.contestId).subscribe(
                (contestDetailResponse) => {
                    this.contestDetailResponseBody = contestDetailResponse.body!;

                    // get round timer
                    let currentRound = this.contestDetailResponseBody.data.currentRound;
                    this.contestTimerDetailService.viewContestTimer(this.contestId, currentRound).subscribe(
                        (contestTimerDetailResponse) => {
                            this.contestTimerDetailResponseBody = contestTimerDetailResponse.body!;

                            let start: string = this.contestTimerDetailResponseBody.data.start;
                            let duration: number = this.contestTimerDetailResponseBody.data.duration;
                            this.startTimer(start, duration);

                            this.loadingTimer = false;
                        },
                        (error) => {
                            if (error.status === 404) {
                            }
                            if (error.status === 400) {
                            }
                            this.loadingTimer = false;
                        }
                    );

                    // get attendee list
                    this.contestAttendeeListService.listContestAttendees(this.contestId).subscribe(
                        (contestAttendeeListResponse) => {
                            this.contestAttendeeListResponseBody = contestAttendeeListResponse.body!;

                            this.sortContestAttendees(
                                this.contestAttendeeListResponseBody.data.attendees,
                                this.contestDetailResponseBody.data.currentRound
                            );

                            this.loadingAttendees = false;

                            // get team list
                            this.contestTeamListService.listContestTeams(this.contestId).subscribe(
                                (contestTeamListResponse) => {
                                    this.contestTeamListResponseBody = contestTeamListResponse.body!;

                                    this.loadingTeams = false;
                                },
                                (error) => {
                                    this.loadingTeams = false;
                                }
                            );
                        },
                        (error) => {
                            if (error.status === 404) {
                            }

                            this.loadingAttendees = false;
                        }
                    );
                },
                (error) => {
                    if (error.status === 404) {
                    }
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

                this.loadingObjectives = false;
            },
            (error) => {
                if (error.status === 404) {
                }

                this.loadingObjectives = false;
            }
        );

        // get contest attendee entries
        this.contestEntryListService.listContestEntries(this.contestId).subscribe(
            (contestEntryListResponse) => {
                this.contestEntryListResponseBody = contestEntryListResponse.body!;

                this.loadingEntries = false;
            },
            (error) => {
                if (error.status === 404) {
                }

                this.loadingEntries = false;
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
            this.overallEntrySum +=
                this.entryValues[i] * this.contestObjectiveListResponseBody.data.objectives[i].value;
        }
    }

    logEntry() {
        let contestEntryNewRequest: ContestEntryNewRequest = {
            contestId: this.contestId,
            attendeeId: this.userId,
            values: this.entryValues,
        };

        this.contestEntryNewService.logContestEntry(contestEntryNewRequest).subscribe(
            (contestEntryNewResponse) => {
                this.contestEntryNewResponseBody = contestEntryNewResponse.body!;
            },
            (error) => {
                if (error.status === 404) {
                }
            }
        );

        // empty values
        for (let i = 0; i < this.entryValues.length; i++) {
            this.entryValues[i] = 0;
        }

        this.overallEntrySum = 0;
    }

    deleteEntry(entryId: string) {
        this.contestEntryDeleteService.deleteContestEntry(entryId).subscribe(
            (contestEntryDeleteResponse) => {
                this.contestEntryDeleteResponseBody = contestEntryDeleteResponse.body!;
            },
            (error) => {
                if (error.status === 404) {
                }
            }
        );
    }

    removeTeam() {
        if (this.teamSizes.length > 0) {
            this.teamSizes.pop();
        }

        this.calculateOverallSize();
    }

    addTeam() {
        this.teamSizes.push(1);

        this.calculateOverallSize();
    }

    sizeLess(index: number) {
        if (this.teamSizes[index] > 1) {
            this.teamSizes[index]--;
        }

        this.calculateOverallSize();
    }

    sizeMore(index: number) {
        this.teamSizes[index]++;

        this.calculateOverallSize();
    }

    calculateOverallSize() {
        this.overallSizeSum = 0;

        for (let i = 0; i < this.teamSizes.length; i++) {
            this.overallSizeSum += this.teamSizes[i];
        }
    }

    generateTeams() {
        let contestTeamsNewRequest: ContestTeamsNewRequest = {
            contestId: this.contestId,
            teamSizes: this.teamSizes,
        };

        this.contestTeamsNewService.generateContestTeams(contestTeamsNewRequest).subscribe(
            (contestTeamsNewResponse) => {
                this.contestTeamsNewResponseBody = contestTeamsNewResponse.body!;
            },
            (error) => {}
        );
    }

    moveAttendee(direction: number, teamPos: number, attendeePos: number) {
        let currentRound = this.contestDetailResponseBody.data.currentRound;

        let movedAttendee = this.contestTeamListResponseBody.data.rounds[currentRound - 1].teams[
            teamPos
        ].attendees.splice(attendeePos, 1);

        if (direction) {
            teamPos--;
        } else {
            teamPos++;
        }

        this.contestTeamListResponseBody.data.rounds[currentRound - 1].teams[teamPos].attendees.push(movedAttendee[0]);
    }

    updateTeams() {
        let currentRound = this.contestDetailResponseBody.data.currentRound;

        let contestTeamsUpdateRequest: ContestTeamsUpdateRequest = {
            contestId: this.contestId,
            round: currentRound,
            teams: this.contestTeamListResponseBody.data.rounds[currentRound - 1].teams,
        };

        this.contestTeamsUpdateService.updateContestTeams(contestTeamsUpdateRequest).subscribe(
            (contestTeamsUpdateResponse) => {
                this.contestTeamsUpdateResponseBody = contestTeamsUpdateResponse.body!;

                this.buttonTeamUpdateClicked = true;
            },
            (error) => {}
        );

        setTimeout(() => {
            this.buttonTeamUpdateClicked = false;
        }, 3000);
    }

    startTimer(start: string, duration: number) {
        // clean up
        if (this.timer && !this.timer.closed) {
            this.timer.unsubscribe();
        }

        // start timer
        this.remainingTime = this.timerService.calculateRemainingTime(start, duration);
        this.timer = interval(1000).subscribe(() => {
            this.remainingTime = this.timerService.calculateRemainingTime(start, duration);
        });
    }

    durationLess() {
        if (this.duration > 5) {
            this.duration -= 5;
        }
    }

    durationMore() {
        if (this.duration < 120) {
            this.duration += 5;
        }
    }

    createTimer() {
        let currentRound = this.contestDetailResponseBody.data.currentRound;

        let contestTimerNewRequest: ContestTimerNewRequest = {
            contestId: this.contestId,
            round: currentRound,
            duration: this.duration,
        };

        this.contestTimerNewService.createContestTimer(contestTimerNewRequest).subscribe(
            (contestTimerNewResponse) => {
                this.contestTimerNewResponseBody = contestTimerNewResponse.body!;

                let start = this.contestTimerNewResponseBody.data.start;
                let duration = this.contestTimerNewResponseBody.data.duration;
                this.startTimer(start, duration);
            },
            (error) => {}
        );
    }
}
