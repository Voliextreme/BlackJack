import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JogoComponent } from './game/jogo/jogo.component';
import { FourOfourComponent } from './four-ofour/four-ofour.component';

@NgModule({
  declarations: [
    AppComponent,
    JogoComponent,
    FourOfourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
