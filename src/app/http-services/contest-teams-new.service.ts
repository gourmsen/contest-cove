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
import { ContestTeamsNewRequest } from "../interfaces/contest-teams-new-request";
import { ContestTeamsNewResponse } from "../interfaces/contest-teams-new-response";

@Injectable({
    providedIn: "root",
})
export class ContestTeamsNewService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    generateContestTeams(
        contestTeamsNewRequest: ContestTeamsNewRequest
    ): Observable<HttpResponse<ContestTeamsNewResponse>> {
        return this.http
            .post<ContestTeamsNewResponse>(environment.manager + "/contest-teams-new/", contestTeamsNewRequest, {
                observe: "response",
            })
            .pipe(catchError((error: HttpErrorResponse) => this.errorHandlerService.handleHttpError(error)));
    }
}
