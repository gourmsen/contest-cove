// basic service
import { Injectable } from '@angular/core';

// environment
import { environment } from '../../environments/environment';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

// services
import { ErrorHandlerService } from '../internal-services/error-handler.service';

// interfaces
import { ContestAttendeeListResponse } from '../interfaces/contest-attendee-list-response';


@Injectable({
  providedIn: 'root'
})
export class ContestAttendeeListService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  listContestAttendees(contestId: string): Observable<HttpResponse<ContestAttendeeListResponse>> {
    return this.http.get<ContestAttendeeListResponse>(environment.manager + "/contest-attendee-list/" + contestId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
