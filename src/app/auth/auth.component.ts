import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {

    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(
        private authservice: AuthService, 
        private router: Router, 
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

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
                this.showErrorAlert( errMessage );
            } else {
                this.router.navigate(['/recipes']);
            }
        },500);
    }

    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(errMessage: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory( 
            AlertComponent 
        );
        const hostViewContainerRef = this.alertHost.vcRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent( alertCmpFactory );

        componentRef.instance.message = errMessage;
        this.closeSub = componentRef.instance.close.subscribe( _ => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(): void {
        if( this.closeSub ) {
            this.closeSub.unsubscribe();
        }
    }
}