// basic service
import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestObjectiveListResponse } from './contest-objective-list-response';


@Injectable({
  providedIn: 'root'
})
export class ContestObjectiveListService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  listContestObjectives(contestId: string): Observable<HttpResponse<ContestObjectiveListResponse>> {
    return this.http.get<ContestObjectiveListResponse>("http://localhost:3000/contest-objective-list/" + contestId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
