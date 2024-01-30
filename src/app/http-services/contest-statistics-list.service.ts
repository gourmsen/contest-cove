// basic service
import { Injectable } from "@angular/core";

// environment
import { environment } from "../../environments/environment";

// http
import {
    HttpClient,
    HttpResponse,
    HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError } from "rxjs";

// services
import { ErrorHandlerService } from "../internal-services/error-handler.service";

// interfaces
import { ContestStatisticsListResponse } from "../interfaces/contest-statistics-list-response";

@Injectable({
    providedIn: "root",
})
export class ContestStatisticsListService {
    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) {}

    listContestStatistics(
        type?: string,
        contestId?: string,
        attendeeId?: string
    ): Observable<HttpResponse<ContestStatisticsListResponse>> {
        let query = "";

        if (type) {
            query = "?type=" + type;
        }

        if (contestId) {
            query
                ? (query += "&contestId=" + contestId)
                : (query = "?contestId=" + contestId);
        }

        if (attendeeId) {
            query
                ? (query += "&attendeeId=" + attendeeId)
                : (query = "?attendeeId=" + attendeeId);
        }

        return this.http
            .get<ContestStatisticsListResponse>(
                environment.manager + "/contest-statistics-list" + query,
                { observe: "response" }
            )
            .pipe(
                catchError((error: HttpErrorResponse) =>
                    this.errorHandlerService.handleHttpError(error)
                )
            );
    }
}
