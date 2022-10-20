import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

	ingredients: Ingredient[] = [];
	private igChangeSub: Subscription;

	constructor(
		private shoppingListService: ShoppingListService, 
		private loggingService: LoggingService
		) { }

	ngOnInit(): void {
		this.loggingService.printLog('ShoppingList Init');
		this.ingredients = this.shoppingListService.getIngredients();
		this.igChangeSub = this.shoppingListService.listRefreshed.subscribe(list => {
			this.ingredients = list;
		});
	}

	onEditItem(index: number) {
		this.shoppingListService.startedEditing.next(index);
	}

	ngOnDestroy(): void {
		this.igChangeSub.unsubscribe();
	}
}