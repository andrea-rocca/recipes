import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { LoggingService } from "../logging.service";
import { SharedModule } from "../shared/shared.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

const routes = [{ 
    path: '', 
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
    ],
    // Even though providedIn root is used providing here creates a different instance of the service
    providers: [LoggingService] 
})
export class ShoppingListModule { }