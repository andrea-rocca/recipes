import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

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
		private authService: AuthService) {
		this.collapsed = true;
	}

	ngOnInit(): void {
		this.userSub = this.authService.user.subscribe(user => {
			this.isAuthenticated = !!user;
		});
	}

	onSaveData(): void {
		this.dataStorageService.storeRecipes();
	}

	onFetchData(): void {
		this.dataStorageService.fetchRecipes().subscribe();
	}

	onLogout(): void {
		this.authService.logout();
	}

	ngOnDestroy(): void {
		this.userSub.unsubscribe();
	}
}
