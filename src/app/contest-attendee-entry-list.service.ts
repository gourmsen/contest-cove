// basic service
import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestAttendeeEntryListResponse } from './contest-attendee-entry-list-response';


@Injectable({
  providedIn: 'root'
})
export class ContestAttendeeEntryListService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  listContestAttendeeEntries(contestId: string): Observable<HttpResponse<ContestAttendeeEntryListResponse>> {
    return this.http.get<ContestAttendeeEntryListResponse>("http://localhost:3000/contest-attendee-entry-list/" + contestId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
