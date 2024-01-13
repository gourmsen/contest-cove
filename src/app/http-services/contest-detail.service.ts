// basic service
import { Injectable } from '@angular/core';

// environment
import { environment } from '../../environments/environment';

// http
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

// services
import { ErrorHandlerService } from '../internal-services/error-handler.service';

// interfaces
import { ContestDetailResponse } from '../interfaces/contest-detail-response';


@Injectable({
  providedIn: 'root'
})
export class ContestDetailService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  viewContest(contestId: string): Observable<HttpResponse<ContestDetailResponse>> {
    return this.http.get<ContestDetailResponse>(environment.manager + "/contest-detail/" + contestId, { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
