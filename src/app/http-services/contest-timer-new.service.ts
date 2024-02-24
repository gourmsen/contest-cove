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
import { ContestTimerNewRequest } from "../interfaces/contest-timer-new-request";
import { ContestTimerNewResponse } from "../interfaces/contest-timer-new-response";

@Injectable({
    providedIn: "root",
})
export class ContestTimerNewService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    createContestTimer(
        contestTimerNewRequest: ContestTimerNewRequest
    ): Observable<HttpResponse<ContestTimerNewResponse>> {
        return this.http
            .post<ContestTimerNewResponse>(environment.manager + "/contest-timer-new/", contestTimerNewRequest, {
                observe: "response",
            })
            .pipe(catchError((error: HttpErrorResponse) => this.errorHandlerService.handleHttpError(error)));
    }
}
