// basic service
import { Injectable } from '@angular/core';

// http
import { HttpErrorResponse } from '@angular/common/http';
import { throwError} from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor() {}

  handleHttpError(error: HttpErrorResponse) {
    if (error.status === 0) {

      // client error
      console.error("Client error:", error.error);
    } else {

      // server error
      console.error("Server error " + error.status + ":", error.error);
    }
    return throwError(error);
  }
}
