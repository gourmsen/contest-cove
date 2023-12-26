// basic service
import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError} from 'rxjs'

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestJoinRequest } from './contest-join-request';
import { ContestJoinResponse } from './contest-join-response';


@Injectable({
  providedIn: 'root'
})
export class ContestJoinService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  joinContest(contestJoinRequest: ContestJoinRequest): Observable<HttpResponse<ContestJoinResponse>> {
    return this.http.post<ContestJoinResponse>("http://localhost:3000/contest-join/", contestJoinRequest, { observe: "response" })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}