import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { map, tap } from 'rxjs/operators';

import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(
        private http: HttpClient, 
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();        
        return this.http
            .put(
                'https://ng-tester-6ee70.firebaseio.com/recipes.json', 
                recipes
            )
            .subscribe(response => {
                console.log( response );
            });
    }

    fetchRecipes() {
        return this.http
            .get<Recipe[]>(
                'https://ng-tester-6ee70.firebaseio.com/recipes.json'
            ).pipe(
                map( recipes => {
                    return recipes.map((recipe)=>{
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                    });
                }),
                tap(recipes => {
                    this.recipeService.setRecipes( recipes );
                }) 
            );
    }
}