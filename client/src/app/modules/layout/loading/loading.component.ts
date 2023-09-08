import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoading } from '@store/shared/shared.selector';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  public showLoading$;
  
  constructor(
    private store: Store
  ) {
    this.showLoading$ = this.store.select(getLoading);
  }
}
