import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule.forRoot( fromApp.appReducer ),
		HttpClientModule,
		EffectsModule.forRoot([AuthEffects]),
		SharedModule,
		CoreModule
	],
	bootstrap: [AppComponent],

	// needed for Angular versions before 9
	// (necessary for dynamically created components)
	/*
	entryComponents: [
		AlertComponent
	]
	*/
})
export class AppModule { }
