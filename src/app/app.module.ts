import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';

import { DropDownDirective } from './shared/dropdown.directive';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		LoadingSpinnerComponent,
		HeaderComponent,
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailComponent,
		RecipeItemComponent,
		ShoppingListComponent,
		ShoppingEditComponent,
		DropDownDirective,
		RecipeStartComponent,
		RecipeEditComponent,
		AlertComponent,
		PlaceholderDirective
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		HttpClientModule
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
