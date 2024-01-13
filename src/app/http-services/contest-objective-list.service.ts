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
import { ContestObjectiveListResponse } from '../interfaces/contest-objective-list-response';


@Injectable({
  providedIn: 'root'
})
export class ContestObjectiveListService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  listContestObjectives(contestId: string): Observable<HttpResponse<ContestObjectiveListResponse>> {
    return this.http.get<ContestObjectiveListResponse>(environment.manager + "/contest-objective-list/" + contestId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
