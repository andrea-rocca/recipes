import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoggingService } from '../logging.service';

import { Ingredient } from '../shared/ingredient.model';

import * as fromApp from '../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

	ingredients: Observable<{ ingredients: Ingredient[] }>;

	constructor(
		private loggingService: LoggingService,
		private store: Store<fromApp.AppState>
		) { }

	ngOnInit(): void {
		this.ingredients = this.store.select('shoppingList');
		this.loggingService.printLog('ShoppingList Init');
	}

	onEditItem(index: number) {
		this.store.dispatch( new ShoppingListActions.StartEdit( index ) );
	}
}