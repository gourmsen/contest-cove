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
import { ContestUpdateRequest } from '../interfaces/contest-update-request';
import { ContestUpdateResponse } from '../interfaces/contest-update-response';


@Injectable({
  providedIn: 'root'
})
export class ContestUpdateService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  updateContest(contestUpdateRequest: ContestUpdateRequest): Observable<HttpResponse<ContestUpdateResponse>> {
    return this.http.put<ContestUpdateResponse>(environment.manager + "/contest-update/", contestUpdateRequest, { observe: "response" })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}