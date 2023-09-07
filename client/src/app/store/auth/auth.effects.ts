import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginFail, loginStart, loginSuccess, logout } from './auth.actions';
import { exhaustMap, map, catchError, tap, switchMap } from "rxjs/operators";
import { ApiService } from 'src/app/modules/api/api.service';
import { of, timer } from 'rxjs';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { AuthService } from '@modules/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setLoading } from '@store/shared/shared.actions';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        private store: Store
    ) { }

    loginStart$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginStart), 
            exhaustMap(action => {
                return this.apiService.login(action.loginForm).pipe(
                    map(loginResponse => {
                        this.store.dispatch(setLoading({ status: false }));
                        const user = this.authService.login(loginResponse);
                        this.alertService.success('Logged In');
                        return loginSuccess({ token: loginResponse.authorization, user, redirect: true });
                    }),
                    catchError(error => {
                        this.store.dispatch(setLoading({ status: false }));
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
            map(() => {
                this.authService.logout();
                this.alertService.success('Logged Out');
                this.router.navigate(['login']);
            })
        );
    },
    { dispatch: false });

    autoLogin$ = createEffect(() => {
        return timer(0).pipe(
            map(() => {
                const token = this.authService.getAccessToken();
                if (token != null) {
                    const user = this.authService.getUserFromToken(token);
                    this.store.dispatch(loginSuccess({ token, user, redirect: false }));
                }
            })
        );
    },
    { dispatch: false });

    autoLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginSuccess),
            map(()  => {
                return this.authService.getTimeout();
            }),
            switchMap((timeout) => {
                console.warn(
                    `Expiration at: ${new Date(new Date().getTime() + timeout)}`
                );
                return timer(timeout);
            }),
            map(() => {
                return logout();
            })
        )
    });
}
