import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RoomsComponent } from './rooms.component';

@NgModule({
  declarations: [
    SidebarComponent,
    RoomsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RoomsModule { }
