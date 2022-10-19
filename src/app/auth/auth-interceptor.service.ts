import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // take operator automatically call unsubscribe after a number of values are emitted
        // exhaustMap operator replace the first observable with another one passed as argument after the first one completes
        return this.authService.user.pipe(
            take(1), 
            exhaustMap(user => {

                if( !user ) {
                    return next.handle( req );
                }

                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle( modifiedReq );
            })
        );
    }
}