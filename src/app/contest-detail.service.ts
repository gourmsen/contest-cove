// basic service
import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestDetailResponse } from './contest-detail-response';


@Injectable({
  providedIn: 'root'
})
export class ContestDetailService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  viewContest(contestId: string): Observable<HttpResponse<ContestDetailResponse>> {
    return this.http.get<ContestDetailResponse>("http://localhost:3000/contest-detail/" + contestId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
