import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiComponent } from './api.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ApiComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    ApiComponent
  ]
})
export class ApiModule { }
