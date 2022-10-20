import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' }, // 
	// { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
	// In Angular 12 lazy loading works with a Promise like this
	{ path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
	{ path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
	{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes, { 
		useHash: false,
		preloadingStrategy: PreloadAllModules
	})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
