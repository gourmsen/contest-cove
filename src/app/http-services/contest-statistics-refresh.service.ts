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
import { ContestStatisticsRefreshRequest } from '../interfaces/contest-statistics-refresh-request';
import { ContestStatisticsRefreshResponse } from '../interfaces/contest-statistics-refresh-response';


@Injectable({
  providedIn: 'root'
})
export class ContestStatisticsRefreshService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  refreshStatistics(contestStatisticsRefreshRequest: ContestStatisticsRefreshRequest): Observable<HttpResponse<ContestStatisticsRefreshResponse>> {
    return this.http.post<ContestStatisticsRefreshResponse>(environment.manager + "/contest-statistics-refresh/", contestStatisticsRefreshRequest, { observe: "response" })
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}