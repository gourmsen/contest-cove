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
import { ContestListResponse } from '../interfaces/contest-list-response';


@Injectable({
  providedIn: 'root'
})
export class ContestListService {
  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  listContests(): Observable<HttpResponse<ContestListResponse>> {
    return this.http.get<ContestListResponse>(environment.manager + "/contest-list/", { observe: "response"})
      .pipe(
        catchError((error: HttpErrorResponse) =>
          this.errorHandlerService.handleHttpError(error)
      ));
  }
}
