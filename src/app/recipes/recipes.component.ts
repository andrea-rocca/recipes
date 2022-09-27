import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  loadedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeLoaded(recipe: Recipe) {
    this.loadedRecipe = recipe;
  }

}
