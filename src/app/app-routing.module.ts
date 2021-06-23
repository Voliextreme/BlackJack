import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FourOfourComponent } from './four-ofour/four-ofour.component';
import { JogoComponent } from './game/jogo/jogo.component';

const routes: Routes = [
  {path: "", component: JogoComponent},
  {path: "jogo", component: JogoComponent},
  {path: "**", redirectTo: "404"},
  {path: "404", component: FourOfourComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
