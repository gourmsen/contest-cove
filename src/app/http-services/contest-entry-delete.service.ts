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
import { ContestEntryDeleteResponse } from "../interfaces/contest-entry-delete-response";

@Injectable({
    providedIn: "root",
})
export class ContestEntryDeleteService {
    constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) {}

    deleteContestEntry(entryId: string): Observable<HttpResponse<ContestEntryDeleteResponse>> {
        return this.http
            .delete<ContestEntryDeleteResponse>(environment.manager + "/contest-entry-delete/" + entryId, {
                observe: "response",
            })
            .pipe(catchError((error: HttpErrorResponse) => this.errorHandlerService.handleHttpError(error)));
    }
}
