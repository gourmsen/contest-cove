// basic service
import { Injectable } from '@angular/core';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError} from 'rxjs'

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestNewRequest } from './contest-new-request';
import { ContestNewResponse } from './contest-new-response';


@Injectable({
  providedIn: 'root'
})
export class ContestNewService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  createContest(contestNewRequest: ContestNewRequest): Observable<HttpResponse<ContestNewResponse>> {
    return this.http.post<ContestNewResponse>("http://localhost:3000/contest-new/", contestNewRequest, { observe: "response" })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}