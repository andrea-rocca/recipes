import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

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

	constructor(
		private store: Store<fromApp.AppState>
	) { }

	ngOnInit(): void {

		this.onEditSub = this.store
			.select('shoppingList')
			.subscribe(stateData => {
				if (stateData.editedIngredientIndex > -1) {
					this.editMode = true;
					this.editedItem = stateData.editedIngredient;
					this.slForm.setValue({
						name: this.editedItem.name,
						amount: this.editedItem.amount
					});
				} else {
					this.editMode = false;
				}
			});
	}

	onSubmit() {
		const value = this.slForm.value;
		const newIngredient = new Ingredient(value.name, value.amount);
		if( this.editMode ) {
			this.store.dispatch( new ShoppingListActions.UpdateIngredient(newIngredient) );
		} else {
			this.store.dispatch( new ShoppingListActions.AddIngredient( newIngredient ) );
		}
		this.onClear();
	}

	onDelete() {
		this.store.dispatch( new ShoppingListActions.DeleteIngredient() );
		this.onClear();
	}

	onClear() {
		this.editMode = false;
		this.slForm.reset();
		this.store.dispatch( new ShoppingListActions.StopEdit() );
	}

	ngOnDestroy(): void {
		this.onEditSub.unsubscribe();
		this.store.dispatch( new ShoppingListActions.StopEdit() );
	}
}
