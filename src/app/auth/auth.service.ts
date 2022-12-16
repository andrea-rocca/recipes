import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

    private tokenExpirationTimer: any;

    constructor(
        private store: Store<fromApp.AppState>
    ) {}

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
                // this.user.next( loadedUser );
                this.store.dispatch( new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email, 
                    userId: loadedUser.id, 
                    token: loadedUser.token, 
                    expirationDate: new Date(userData._tokenExpirationDate)
                }));
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.autoLogout( expirationDuration );
            }
        }
    }

    logout() {
        // this.user.next( null );
        // this.store.dispatch( new AuthActions.Logout() );

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
}