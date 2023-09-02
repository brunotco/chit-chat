import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autoLogin, autoLoginSuccess, loginFail, loginStart, loginSuccess, logout } from './auth.actions';
import { switchMap, exhaustMap, map, catchError, tap, mergeMap } from "rxjs/operators";
import { ApiService } from 'src/app/api/api.service';
import { from, of } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthService } from '../auth.service';
import { LoginResponse } from 'src/app/models/login-response.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router
    ) { }

    loginStart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart), 
            exhaustMap(action => {
                return this.apiService.login(action.loginForm).pipe(
                    map(loginResponse => {
                        //? Disable loading
                        this.authService.login(loginResponse);
                        this.alertService.success('Logged In');
                        return loginSuccess({ loginResponse, redirect: true });
                    }),
                    catchError(error => {
                        //? Disable loading
                        this.alertService.error(error.error.message);
                        return of(loginFail(error));
                    })
                );
            })
        )
    });

    loginRedirect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(...[loginSuccess]),
            tap(action => {
                if (action.redirect) {
                    this.router.navigate(['/']);
                }
            })
        );
    },
    { dispatch: false });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logout),
            map(action => {
                this.authService.logout();
                this.alertService.success('Logged Out');
                this.router.navigate(['login']);
            })
        );
    },
    { dispatch: false });

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            mergeMap(action => {
                const user = this.authService.getUser();
                const token = this.authService.getAccessToken();
                if (token) this.authService.sessionTimeout(token);
                return of(autoLoginSuccess({ data: { token, user }, redirect: false }))
            })
        )
    })
}