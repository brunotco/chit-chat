import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { ComponentStore, tapResponse, OnStoreInit } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { AlertService } from '@services/alert.service';
import { ApiService } from '@services/api.service';
import { setLoading } from '@store/shared/shared.actions';
import { exhaustMap, tap } from 'rxjs';

export interface UsersState {
    users: User[];
}

export const initialState: UsersState = {
    users: []
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> implements OnStoreInit {
    constructor(
        private apiService: ApiService,
        private alertService: AlertService,
        private store: Store
    ) {
        super(initialState);
    }

    ngrxOnStoreInit() {
        this.store.dispatch(setLoading({ status: true }));
        this.getUsers();
    }

    users$ = this.select(state => state.users);

    updateUsers = this.updater((state, users: User[]) => ({
        users
    }));

    getUsers = this.effect<void>(
        (trigger$) => trigger$.pipe(
            exhaustMap(() => {
                return this.apiService.getUsers().pipe(
                    tap(() => this.store.dispatch(setLoading({ status: false }))),
                    tapResponse(
                        (result) => this.updateUsers(result),
                        (error: { message: string }) => this.alertService.error(error.message)
                    )
                )
            })
        )
    );

}