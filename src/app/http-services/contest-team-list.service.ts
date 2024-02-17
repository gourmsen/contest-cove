// basic service
import { Injectable } from "@angular/core";

// environment
import { environment } from "../../environments/environment";

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError } from "rxjs";

// services
import { ErrorHandlerService } from "../internal-services/error-handler.service";

// interfaces
import { ContestTeamListResponse } from "../interfaces/contest-team-list-response";

@Injectable({
    providedIn: "root",
})
export class ContestTeamListService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    listContestTeams(contestId: string): Observable<HttpResponse<ContestTeamListResponse>> {
        return this.http
            .get<ContestTeamListResponse>(environment.manager + "/contest-team-list/" + contestId, {
                observe: "response",
            })
            .pipe(catchError((error: HttpErrorResponse) => this.errorHandlerService.handleHttpError(error)));
    }
}
