import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipesModule } from './recipes/recipes.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule,
		RecipesModule,
		ShoppingListModule,
		SharedModule
	],
	providers: [ShoppingListService, RecipeService, {
		provide: HTTP_INTERCEPTORS,
		useClass: AuthInterceptorService,
		multi: true
	}],
	bootstrap: [AppComponent],

	// needed for Angular versions before 9
	// this is necessary for dynamically created components
	entryComponents: [
		AlertComponent
	]
})
export class AppModule { }
