import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from "./recipes.routing.module";

// check why it cannot be imported from the shared folder
import { DropDownDirective } from "./dropdown";

@NgModule({
    declarations: [
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailComponent,
		RecipeItemComponent,
		RecipeStartComponent,
		RecipeEditComponent,
		DropDownDirective
    ],
    imports: [
		RouterModule,
        CommonModule,
        ReactiveFormsModule,
		RecipesRoutingModule
    ],
	// Using the RecipesRoutingModule there's no need for the single components to be exported anymore
	/*
    exports: [
		RecipesComponent,
		RecipeListComponent,
		RecipeDetailComponent,
		RecipeItemComponent,
		RecipeStartComponent,
		RecipeEditComponent    
    ]
	*/
})
export class RecipesModule { }