import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {

    recipeSelected = new Subject<Recipe>();

    recipesChanged = new Subject<Recipe[]>();

    /*
    private recipes: Recipe[] = [
        new Recipe(
            'A Burger',
            'This is a test',
            'https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 21)
            ]),
        new Recipe(
            'A Schnitzel',
            'This is a test',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG/1200px-Breitenlesau_Krug_Br%C3%A4u_Schnitzel.JPG',
            [])
    ];
    */

    private recipes: Recipe[] = [];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next( this.recipes.slice() );
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients( ingredients );
    }

    getRecipeById(index: number) {
        return this.recipes.slice()[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push( recipe );
        this.recipesChanged.next( this.recipes.slice() );
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next( this.recipes.slice() );
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next( this.recipes.slice() );
    }
}