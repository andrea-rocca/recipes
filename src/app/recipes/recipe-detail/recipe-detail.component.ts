import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  selectedRecipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // const id = this.route.snapshot.params['id'];
    this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.selectedRecipe = this.recipeService.getRecipeById( this.id );
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList( this.selectedRecipe.ingredients );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // OR with absolute path
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
