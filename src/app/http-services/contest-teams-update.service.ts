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
import { ContestTeamsUpdateRequest } from "../interfaces/contest-teams-update-request";
import { ContestTeamsUpdateResponse } from "../interfaces/contest-teams-update-response";

@Injectable({
    providedIn: "root",
})
export class ContestTeamsUpdateService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    updateContestTeams(
        contestTeamsUpdateRequest: ContestTeamsUpdateRequest
    ): Observable<HttpResponse<ContestTeamsUpdateResponse>> {
        return this.http
            .put<ContestTeamsUpdateResponse>(
                environment.manager + "/contest-teams-update/",
                contestTeamsUpdateRequest,
                {
                    observe: "response",
                }
            )
            .pipe(catchError((error: HttpErrorResponse) => this.errorHandlerService.handleHttpError(error)));
    }
}
