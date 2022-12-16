import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	isAuthenticated: boolean = false;

	collapsed: boolean;

	private userSub: Subscription;

	constructor(
		private dataStorageService: DataStorageService, 
		private authService: AuthService,
		private store: Store<fromApp.AppState>
	) {
		this.collapsed = true;
	}

	ngOnInit(): void {
		this.userSub = this.store.select('auth')
		.pipe(
			map(authState => authState.user)
		)
		.subscribe(user => {
			this.isAuthenticated = !!user;
		});		

		/*
		this.userSub = this.authService.user.subscribe(user => {
			this.isAuthenticated = !!user;
		});
		*/
	}

	onSaveData(): void {
		this.dataStorageService.storeRecipes();
	}

	onFetchData(): void {
		this.dataStorageService.fetchRecipes().subscribe();
	}

	onLogout(): void {
		this.store.dispatch( new  AuthActions.Logout() );
	}

	ngOnDestroy(): void {
		this.userSub.unsubscribe();
	}
}
