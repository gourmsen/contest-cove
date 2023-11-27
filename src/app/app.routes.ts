import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    }
];
