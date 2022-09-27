import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[];
    @Output() recipeWasSelected: EventEmitter<Recipe> = new EventEmitter();
    

    constructor() { 
      this.recipes = [
          new Recipe('A Test Recipe','This is a test','https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg'),
          new Recipe('Another Test Recipe','This is a test','https://images2.minutemediacdn.com/image/upload/c_crop,h_1126,w_2000,x_0,y_181/f_auto,q_auto,w_1100/v1554932288/shape/mentalfloss/12531-istock-637790866.jpg')
      ];
    }

    ngOnInit(): void {
    }

    onRecipeSelected(recipe: Recipe) {
      this.recipeWasSelected.emit(recipe);
    }

}