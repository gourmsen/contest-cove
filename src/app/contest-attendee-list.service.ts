// basic service
import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestAttendeeListResponse } from './contest-attendee-list-response';


@Injectable({
  providedIn: 'root'
})
export class ContestAttendeeListService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  listContestAttendees(contestId: string): Observable<HttpResponse<ContestAttendeeListResponse>> {
    return this.http.get<ContestAttendeeListResponse>("http://localhost:3000/contest-attendee-list/" + contestId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
