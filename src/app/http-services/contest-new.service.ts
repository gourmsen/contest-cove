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
import { ContestNewRequest } from '../interfaces/contest-new-request';
import { ContestNewResponse } from '../interfaces/contest-new-response';


@Injectable({
  providedIn: 'root'
})
export class ContestNewService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  createContest(contestNewRequest: ContestNewRequest): Observable<HttpResponse<ContestNewResponse>> {
    return this.http.post<ContestNewResponse>(environment.manager + "/contest-new/", contestNewRequest, { observe: "response" })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}