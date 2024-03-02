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
import { ContestEntryListResponse } from "../interfaces/contest-entry-list-response";

@Injectable({
    providedIn: "root",
})
export class ContestEntryListService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    listContestEntries(contestId: string): Observable<HttpResponse<ContestEntryListResponse>> {
        return this.http
            .get<ContestEntryListResponse>(environment.manager + "/contest-entry-list/" + contestId, {
                observe: "response",
            })
            .pipe(catchError((error: HttpErrorResponse) => this.errorHandlerService.handleHttpError(error)));
    }
}
