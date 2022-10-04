import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
	selector: 'app-shopping-edit',
	templateUrl: './shopping-edit.component.html',
	styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

	@ViewChild('f', {static: false}) slForm: NgForm;

	onEditSub: Subscription = new Subscription;
	editMode: boolean = false;
	editedItemIndex: number;
	editedItem: Ingredient;

	constructor(private shoppingListService: ShoppingListService) { }

	ngOnInit(): void {
		this.onEditSub = this.shoppingListService.startedEditing.subscribe( (index: number) => {
			this.editMode = true;
			this.editedItemIndex = index;
			this.editedItem = this.shoppingListService.getIngredient( this.editedItemIndex );
			this.slForm.setValue({
				name: this.editedItem.name,
				amount: this.editedItem.amount
			});
		});
	}

	onSubmit() {
		const value = this.slForm.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if( this.editMode ) {
			this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
		} else {
			this.shoppingListService.addIngredient(newIngredient);
		}
		this.onClear();
	}

	onDelete() {
		this.shoppingListService.deleteIngredient( this.editedItemIndex );
		this.onClear();
	}

	onClear() {
		this.editMode = false;
		this.slForm.reset();
	}

	ngOnDestroy(): void {
		this.onEditSub.unsubscribe();
	}
}
