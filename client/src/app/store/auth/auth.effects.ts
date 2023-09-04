import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autoLogin, autoLogout, loginFail, loginStart, loginSuccess, logout } from './auth.actions';
import { exhaustMap, map, catchError, tap, mergeMap, delay, observeOn, take, switchMap } from "rxjs/operators";
import { ApiService } from 'src/app/api/api.service';
import { of, timer } from 'rxjs';
import { AlertService } from 'src/app/alert/alert.service';
import { AuthService } from '../../auth/auth.service';
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
                        this.authService.login(loginResponse);
                        this.alertService.success('Logged In');
                        return loginSuccess({ loginResponse, redirect: true });
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
            map(action => {
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
                const user = this.authService.getUser();
                const token = this.authService.getAccessToken();
                if (user != null && token != null) {
                    this.store.dispatch(autoLogin({ data: { token, user }, redirect: false }));
                }
            })
        );

        // return timer(0).pipe(
        //     map(() => {
        //         return of(this.authService.log());
        //     })
        // );
    },
    {dispatch:false});

    //? Create effect to do this
    // this.logoutTimeout = setTimeout(() => {
    //     this.store.dispatch(logout());
    //   }, timeout);
}
