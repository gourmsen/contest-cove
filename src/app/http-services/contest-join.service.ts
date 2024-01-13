// basic service
import { Injectable } from '@angular/core';

// environment
import { environment } from '../../environments/environment';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError} from 'rxjs'

// services
import { ErrorHandlerService } from '../internal-services/error-handler.service';

// interfaces
import { ContestJoinRequest } from '../interfaces/contest-join-request';
import { ContestJoinResponse } from '../interfaces/contest-join-response';


@Injectable({
  providedIn: 'root'
})
export class ContestJoinService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  joinContest(contestJoinRequest: ContestJoinRequest): Observable<HttpResponse<ContestJoinResponse>> {
    return this.http.post<ContestJoinResponse>(environment.manager + "/contest-join/", contestJoinRequest, { observe: "response" })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}