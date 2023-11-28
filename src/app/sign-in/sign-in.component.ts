// basic component
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// reactive forms
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';

// services
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

// interfaces
import { SignInRequest } from '../sign-in-request';
import { SignInResponse } from '../sign-in-response';

// bootstrap components
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

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

  isAuthorized: boolean = false;
  isUnauthorized: boolean = false;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService
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
          this.isAuthorized = true;
          this.isUnauthorized = false;

          // write cookie with token
          this.cookieService.set("tokenId", this.signInResponseBody.data.tokenId, 28);
        },
        (error) => {

          // print unauthorized
          this.isAuthorized = false;
          this.isUnauthorized = true;
        }
      )
  }
}
