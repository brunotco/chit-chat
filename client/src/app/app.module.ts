import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@modules/layout/layout.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appEffects, appReducers } from '@store/app.state';
import { ApiModule } from './modules/api/api.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    ApiModule,
    EffectsModule.forRoot(appEffects),
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ logOnly: false }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
