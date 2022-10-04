import { Subject } from 'rxjs';
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    listRefreshed = new Subject<Ingredient[]>();

    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomatoes',10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    checkAndAdd(item: Ingredient) {
        let found = false;
        this.ingredients.forEach(el=>{
            if(el.name===item.name) {
                el.amount = +item.amount + +el.amount;
                found = true;
            }
        });
        if( !found ) {
            this.ingredients.push( item );
        }
    }

    addIngredient(item: Ingredient) {
        this.checkAndAdd(item);
        this.listRefreshed.next( this.ingredients.slice() );
    }

    addIngredients(list: Ingredient[]) {
        for(let item of list) {
            this.checkAndAdd( item );
        }
        this.listRefreshed.next( this.ingredients.slice() );
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
		this.ingredients[index] = newIngredient;
        this.listRefreshed.next( this.ingredients.slice() );
	}

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.listRefreshed.next( this.ingredients.slice() );
    }
}