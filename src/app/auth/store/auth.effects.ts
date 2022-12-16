import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthResponseData } from '../auth.service';

import * as AuthActions from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

const api_key = environment.firebaseAPIKey;

const handleAuthentication = (
    email: string, 
    localId: string, 
    idToken: string, 
    expiresIn: number
    ) => {
    // expiresIn is in seconds, so it's converted in ms
    const expirationDate = new Date( 
        new Date().getTime() + expiresIn * 1000 
    );
    return new AuthActions.AuthenticateSuccess({
        email: email,
        userId: localId,
        token: idToken,
        expirationDate: expirationDate
    });
};

const handleError = (err: any) => {
    let errMsg = 'An unknown error occurred!';

    if(!err.error || !err.error.error || !err.error.error.message) {
        return of( new AuthActions.AuthenticateFail( errMsg ) );
    } else {
        const err_code =  err.error.error.message;
        switch(err_code) {
            case 'EMAIL_EXISTS':
                    errMsg = 'The entered email already exists.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                    errMsg = 'Access with credentials is disabled for this project.';
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errMsg = 'Requests form this device have been blocked due to suspect activities. Try again Later.';
                break;
            case 'EMAIL_NOT_FOUND':
            case 'INVALID_PASSWORD':
                    errMsg = 'The entered email or password is not correct.';
                break;
            case 'USER_DISABLED':
                    errMsg = 'User account has been disabled.';
                break;
            default: 
                    errMsg = 'An error occurred!';
                break;
        }
        return of( new AuthActions.AuthenticateFail( errMsg ) );
    }
};

@Injectable()
export class AuthEffects {
    signin_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+api_key;
    signup_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+api_key;

    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap( (signupAction: AuthActions.SignupStart) => {
            return this.http.post<AuthResponseData>(
                this.signup_url, 
                {
                    email: signupAction.payload.email,
                    password: signupAction.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map( resData => {
                    return handleAuthentication( resData.email, resData.localId, resData.idToken, +resData.expiresIn );
                }),
                catchError( err => {
                    return handleError( err );
                })
            )
        })
    );

    // ofType is provided by ngrx effects and allows to filter only the actions we want to consider in the pipe
    @Effect() 
    authLogin = this.actions$
    .pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http.post<AuthResponseData>(
                this.signin_url, 
                {
                    email: authData.payload.email,
                    password: authData.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                map( resData => {
                    return handleAuthentication( resData.email, resData.localId, resData.idToken, +resData.expiresIn );
                }),
                catchError( err => {
                    return handleError( err );
                })
            )
        }),
    );

    // setting dispatch to false lets ngrx know that this effect does not dispatch another observable action 
    @Effect({dispatch: false})
    authRedirect = this.actions$
    .pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT),
        tap(()=>{
            this.router.navigate(['/']);
        })  
    );

    constructor(
        private actions$: Actions, 
        private http: HttpClient,
        private router: Router
    ) {}
}