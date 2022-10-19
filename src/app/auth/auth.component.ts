import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;

    constructor(private authservice: AuthService, private router: Router) {}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if( !form.valid ) {
            return;
        }

        const email = form.value.email; //test@test.com
        const password = form.value.password; //Cipollina_1

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;

        if( this.isLoginMode ) {
            authObs = this.authservice.login(email, password);
        } else {
            authObs = this.authservice.signup(email, password);
        }

        authObs.subscribe( res => {
            this.stopLoading();                
        }, errMessage => {
            this.stopLoading( errMessage );
        });

        form.reset();
    }

    stopLoading(errMessage?: string) {
        setTimeout(_=>{
            this.isLoading = false;
            if(errMessage) {
                this.error = errMessage;
            } else {
                this.router.navigate(['/recipes']);
            }
        },500);
    }
}