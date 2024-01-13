// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// reactive forms
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';

// services
import { AuthService } from '../http-services/auth.service';

// interfaces
import { SignInRequest } from '../interfaces/sign-in-request';
import { SignInResponse } from '../interfaces/sign-in-response';

// bootstrap components
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from '../internal-services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbToastModule] ,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm: FormGroup = new FormGroup({
    tokenId: new FormControl('', Validators.required)
  });

  signInResponseBody: SignInResponse;

  isUnauthorized: boolean = false;
  isOtherError: boolean = false;

  constructor(
    private authService: AuthService,
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  signIn() {

    // prepare request
    let signInRequest: SignInRequest = {
      tokenId: String(this.signInForm.value.tokenId)
    }

    this.authService.signIn(signInRequest)
      .subscribe(
        (SignInResponse) => {
          this.signInResponseBody = SignInResponse.body!;

          // print authorized
          this.isUnauthorized = false;
          this.isOtherError = false;

          this.sharedDataService.setCookieTokenId(this.signInForm.value.tokenId);
          this.sharedDataService.setCookieUserId(this.signInResponseBody.data.userId);
          this.sharedDataService.setCookieName(this.signInResponseBody.data.name);

          this.router.navigate([""]);
        },
        (error) => {

          // print unauthorized
          if (error.status === 401) {
            this.isUnauthorized = true;
            this.isOtherError = false;
          } else {
            this.isUnauthorized = false;
            this.isOtherError = true;
          }
        }
      )
  }
}
