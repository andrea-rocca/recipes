import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {

    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

    private closeSub: Subscription;
    private storeSub: Subscription;

    constructor(
        private router: Router, 
        private componentFactoryResolver: ComponentFactoryResolver,
        private store: Store<fromApp.AppState>
    ) {}

    ngOnInit(): void {
        this.storeSub = this.store.select('auth').subscribe(authState => {
            this.isLoading = authState.loading;
            this.error = authState.authError;
            if ( this.error ) {
                this.showErrorAlert( this.error );
            }
        });        
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if( !form.valid ) {
            return;
        }

        const email = form.value.email; //test@test.com
        const password = form.value.password; //Cipollina_1

        if( this.isLoginMode ) {
            this.store.dispatch( 
                new AuthActions.LoginStart({ 
                    email, 
                    password
                })
            );
        } else {
            this.store.dispatch( 
                new AuthActions.SignupStart({ 
                    email, 
                    password
                })
            );
        }

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
        }, 500);
    }

    onHandleError() {
        this.store.dispatch( new AuthActions.ClearError() );
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
        if( this.storeSub ) {
            this.storeSub.unsubscribe();
        }
    }
}