import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from '../api/api.module';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    LoginComponent,
    LandingComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ApiModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
