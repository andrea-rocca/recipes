import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Route, RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AuthComponent } from "./auth.component";

const routes: Route[] = [
    { path: '', component: AuthComponent }
];

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes)
    ]
})
export class AuthModule { }