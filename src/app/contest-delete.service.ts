// basic service
import { Injectable } from '@angular/core';

// environment
import { environment } from '../environments/environment';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

// services
import { ErrorHandlerService } from './error-handler.service';

// interfaces
import { ContestDeleteResponse } from './contest-delete-response';

@Injectable({
  providedIn: 'root'
})
export class ContestDeleteService {

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  deleteContest(contestId: string, userId: string): Observable<HttpResponse<ContestDeleteResponse>> {
    return this.http.delete<ContestDeleteResponse>(environment.manager + "/contest-delete/" + contestId + "/" + userId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
