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
import { ContestEntryNewRequest } from "../interfaces/contest-entry-new-request";
import { ContestEntryNewResponse } from "../interfaces/contest-entry-new-response";

@Injectable({
    providedIn: "root",
})
export class ContestEntryNewService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    logContestEntry(contestEntryNewRequest: ContestEntryNewRequest): Observable<HttpResponse<ContestEntryNewResponse>> {
        return this.http
            .post<ContestEntryNewResponse>(environment.manager + "/contest-entry-new/", contestEntryNewRequest, {
                observe: "response",
            })
            .pipe(catchError((error: HttpErrorResponse) => this.errorHandlerService.handleHttpError(error)));
    }
}
