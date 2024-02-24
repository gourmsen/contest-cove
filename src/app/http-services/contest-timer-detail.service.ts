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
import { ContestTimerDetailResponse } from "../interfaces/contest-timer-detail-response";

@Injectable({
    providedIn: "root",
})
export class ContestTimerDetailService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    viewContestTimer(contestId: string, round: number): Observable<HttpResponse<ContestTimerDetailResponse>> {
        return this.http
            .get<ContestTimerDetailResponse>(environment.manager + "/contest-timer-detail/" + contestId + "/" + round, {
                observe: "response",
            })
            .pipe(catchError((error: HttpErrorResponse) => this.errorHandlerService.handleHttpError(error)));
    }
}
