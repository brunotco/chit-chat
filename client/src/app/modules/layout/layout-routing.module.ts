import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TempComponent } from './temp/temp.component';

const routes: Routes = [
  { path: 'rooms', component: TempComponent },
  { path: 'profile', component: TempComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
