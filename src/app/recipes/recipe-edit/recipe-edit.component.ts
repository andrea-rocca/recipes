import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';

@Component({
	selector: 'app-recipe-edit',
	templateUrl: './recipe-edit.component.html',
	styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

	id: number;
	editMode: boolean = false;
	recipeForm: FormGroup;

	constructor( private route: ActivatedRoute, 
				 private recipeService: RecipeService,
				 private router: Router ) { }

	ngOnInit(): void {
		this.route.params.subscribe((params: Params) => {
			this.id = +params['id'];
			this.editMode = params.hasOwnProperty('id');
			this.initForm();
		});
	}

	private initForm() {
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDesc = '';
		let recipeIngredients = new FormArray([]);

		if(this.editMode) {
			const recipe = this.recipeService.getRecipeById(this.id);
			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDesc = recipe.description;
			if(recipe.hasOwnProperty('ingredients')) {
				for(let ingredient of recipe.ingredients) {
					let newGroup = new FormGroup({
						'name': new FormControl(ingredient.name, Validators.required),
						'amount': new FormControl(ingredient.amount, [
							Validators.required, 
							Validators.pattern(/^[1-9]+[0-9]*$/)
						])
					});
					recipeIngredients.push( newGroup );
				}
			}
		}

		this.recipeForm = new FormGroup({
			'name': new FormControl(recipeName, Validators.required),
			'description': new FormControl(recipeDesc, Validators.required),
			'imagePath': new FormControl(recipeImagePath, Validators.required),
			'ingredients': recipeIngredients
		});
	}

	onSubmit() {
		/*
		const newRec = new Recipe(
				this.recipeForm.value.name, 
				this.recipeForm.value.description,
				this.recipeForm.value.imagePath,
				this.recipeForm.value.ingredients
			);
		*/

		if( this.editMode ) {
			this.recipeService.updateRecipe(+this.id, this.recipeForm.value);
		} else {
			this.recipeService.addRecipe(this.recipeForm.value);
		}

		this.onCancel();
	}

	get ingredientsControls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}

	onAddIngredient() {
		let newGroup = new FormGroup({
			'name': new FormControl(null, Validators.required),
			'amount': new FormControl(null, [
				Validators.required, 
				Validators.pattern(/^[1-9]+[0-9]*$/)
			])
		});
		(<FormArray>this.recipeForm.get('ingredients')).push( newGroup );
	}

	onCancel() {
		this.router.navigate(['../'], {relativeTo: this.route});
	}

	onDeleteIngredient(index: number) {
		console.log( index );
		(<FormArray>this.recipeForm.get('ingredients')).removeAt( index );
		this.recipeForm.patchValue({
			'ingredients': this.recipeForm.value['ingredients'].splice(index, 1)
		});
	}

	onClearForm() {
		this.onCancel();
		// this.router.navigate(['../', this.id]);
	}

}
