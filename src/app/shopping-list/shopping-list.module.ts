import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { SharedModule } from "../shared/shared.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const routes = [{ 
    path: 'shopping-list', 
    component: ShoppingListComponent, 
    canActivate: [AuthGuard] 
}];

@NgModule({
    declarations: [
        ShoppingListComponent,
		ShoppingEditComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class ShoppingListModule { }