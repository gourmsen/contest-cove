// basic service
import { Injectable } from '@angular/core';

// environment
import { environment } from '../environments/environment';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError} from 'rxjs'

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestAttendeeEntryNewRequest } from './contest-attendee-entry-new-request';
import { ContestAttendeeEntryNewResponse } from './contest-attendee-entry-new-response';


@Injectable({
  providedIn: 'root'
})
export class ContestAttendeeEntryNewService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  logContestEntry(contestAttendeeEntryNewRequest: ContestAttendeeEntryNewRequest): Observable<HttpResponse<ContestAttendeeEntryNewResponse>> {
    return this.http.post<ContestAttendeeEntryNewResponse>(environment.manager + "/contest-attendee-entry-new/", contestAttendeeEntryNewRequest, { observe: "response" })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}