import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecipesModule } from './recipes/recipes.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
		RecipesModule,
		ShoppingListModule,
		SharedModule,
		CoreModule
	],
	bootstrap: [AppComponent],

	// needed for Angular versions before 9
	// this is necessary for dynamically created components
	/*
	entryComponents: [
		AlertComponent
	]
	*/
})
export class AppModule { }
