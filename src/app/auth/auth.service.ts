import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const api_key = 'AIzaSyDrHq3CZRR79hA5tHDckPWV2wwT_7PL-VY';

@Injectable({providedIn: 'root'})
export class AuthService {
    // BehaviourSubject lets the subscriber retrieve the last value emitted before the subscription
    user = new BehaviorSubject<User>(null);

    signup_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+api_key;
    signin_url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+api_key;

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signup_url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError( this.handleError ),
            tap( resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.signin_url, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(            
            catchError( this.handleError ),
            tap( resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    autoLogin() {
        const userData = JSON.parse( localStorage.getItem( 'userData' ) );
        if( !userData ) {
            return;
        } else {
            const loadedUser = new User(
                userData.email, 
                userData.id, 
                userData._token, 
                new Date(userData._tokenExpirationDate)
            );

            if( loadedUser.token ) {
                this.user.next( loadedUser );
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout( expirationDuration );
            }
        }
    }

    logout() {
        this.user.next( null );
        this.router.navigate(['/auth']);
        localStorage.removeItem( 'userData' );
        if( this.tokenExpirationTimer ) {
            clearTimeout( this.tokenExpirationTimer );
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout( _ => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        // expiresIn is in seconds, so it's converted in ms
        const expirationDate = new Date( 
            new Date().getTime() + expiresIn * 1000 
        );
        const _user = new User(
            email, 
            userId, 
            token, 
            expirationDate
        );
        this.user.next( _user );
        this.autoLogout( expiresIn * 1000 );
        localStorage.setItem( 'userData', JSON.stringify( _user ) );
    }

    private handleError(err: HttpErrorResponse) {
        let errMsg = 'An unknown error occurred!';console.log( err );

        if(!err.error || !err.error.error || !err.error.error.message) {
            return throwError( errMsg );
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
            return throwError( errMsg );
        }
    }
}