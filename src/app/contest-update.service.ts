// basic service
import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError} from 'rxjs'

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestUpdateRequest } from './contest-update-request';
import { ContestUpdateResponse } from './contest-update-response';


@Injectable({
  providedIn: 'root'
})
export class ContestUpdateService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  updateContest(contestUpdateRequest: ContestUpdateRequest): Observable<HttpResponse<ContestUpdateResponse>> {
    return this.http.put<ContestUpdateResponse>("http://localhost:3000/contest-update/", contestUpdateRequest, { observe: "response" })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}