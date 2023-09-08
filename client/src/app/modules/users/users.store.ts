import { Injectable } from '@angular/core';
import { User } from '@models/user.model';
import { ComponentStore, tapResponse, OnStoreInit } from '@ngrx/component-store';
import { AlertService } from '@services/alert.service';
import { ApiService } from '@services/api.service';
import { exhaustMap } from 'rxjs';

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
        private alertService: AlertService
    ) {
        super(initialState);
    }

    ngrxOnStoreInit() {
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
                    tapResponse(
                        (result) => this.updateUsers(result),
                        (error: { message: string }) => this.alertService.error(error.message)
                    )
                )
            })
        )
    );

}