// basic component
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

// services
import { ContestStatisticsListService } from "../http-services/contest-statistics-list.service";

// interfaces
import { ContestStatisticsListResponse } from "../interfaces/contest-statistics-list-response";

@Component({
    selector: "app-leaderboard",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./leaderboard.component.html",
    styleUrl: "./leaderboard.component.css",
})
export class LeaderboardComponent {
    contestStatisticsListResponseBody: ContestStatisticsListResponse;

    loadingMedals: boolean;
    loadingPoints: boolean;
    loadingObjectivePoints: boolean;

    statisticsMedals: any[] = [];
    statisticsPoints: any[] = [];
    statisticsObjectivePoints: any[] = [];

    constructor(
        private contestStatisticsListService: ContestStatisticsListService
    ) {}

    ngOnInit() {
        this.loadingMedals = true;
        this.loadingPoints = true;
        this.loadingObjectivePoints = true;

        // get statistics list
        this.contestStatisticsListService.listContestStatistics().subscribe(
            (contestStatisticsListResponse) => {
                this.contestStatisticsListResponseBody =
                    contestStatisticsListResponse.body!;

                this.sortByMedals();
                this.loadingMedals = false;
                this.sortByPoints();
                this.loadingPoints = false;
                this.sortByObjectivePoints();
                this.loadingObjectivePoints = false;
            },
            (error) => {}
        );
    }

    sortByMedals() {
        let attendees = this.contestStatisticsListResponseBody.data;

        // get medal value for each attendee
        for (let i = 0; i < attendees.length; i++) {
            let medalValue = 0;

            for (let j = 0; j < attendees[i].medals.length; j++) {
                switch (j) {
                    case 0:
                        medalValue += attendees[i].medals[j] * 3;
                        break;
                    case 1:
                        medalValue += attendees[i].medals[j] * 2;
                        break;
                    case 2:
                        medalValue += attendees[i].medals[j];
                        break;
                }
            }

            let medalData = {
                name: attendees[i].attendee.name,
                value: medalValue,
                medals: attendees[i].medals,
            };

            this.statisticsMedals.push(medalData);
        }

        // sort attendees based on medal value
        this.statisticsMedals.sort((a: any, b: any) => {
            return b.value - a.value;
        });
    }

    sortByPoints() {
        let attendees = this.contestStatisticsListResponseBody.data;

        // get points value for each attendee in total, average and best
        for (let i = 0; i < attendees[0].points.length; i++) {
            let statistics: any[] = [];

            for (let j = 0; j < attendees.length; j++) {
                let pointsData = {
                    name: attendees[j].attendee.name,
                    value: Math.round((attendees[j].points[i] * 100) / 100),
                };

                statistics.push(pointsData);
            }

            // sort attendees based on points value
            statistics.sort((a: any, b: any) => {
                return b.value - a.value;
            });

            this.statisticsPoints.push(statistics);
        }
    }

    sortByObjectivePoints() {
        let attendees = this.contestStatisticsListResponseBody.data;

        // get each objective
        for (let i = 0; i < attendees[0].objectives.length; i++) {
            let categoryList: any[] = [];

            // get each category
            for (let j = 0; j < attendees[0].objectives[i].values.length; j++) {
                let attendeeList: any[] = [];

                // get each attendee
                for (let k = 0; k < attendees.length; k++) {
                    let pointsData = {
                        name: attendees[k].attendee.name,
                        value: Math.round(
                            (attendees[k].objectives[i].values[j] * 100) / 100
                        ),
                    };

                    attendeeList.push(pointsData);
                }

                // sort attendees based on points value
                attendeeList.sort((a: any, b: any) => {
                    return b.value - a.value;
                });

                categoryList.push(attendeeList);
            }

            let objectiveData = {
                name: attendees[0].objectives[i].name,
                values: categoryList,
            };

            // fill objective
            this.statisticsObjectivePoints.push(objectiveData);
        }
    }
}
