// basic service
import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestLeaveResponse } from './contest-leave-response';

@Injectable({
  providedIn: 'root'
})
export class ContestLeaveService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  leaveContest(contestId: string, userId: string): Observable<HttpResponse<ContestLeaveResponse>> {
    return this.http.delete<ContestLeaveResponse>("http://localhost:3000/contest-leave/" + contestId + "/" + userId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
