import { Component, OnInit, ViewChild } from '@angular/core';
import { asapScheduler } from 'rxjs';
import { Card } from 'src/app/class/card';
import { Deckinit } from 'src/app/class/deckinit';
import { BlackjackService } from 'src/app/services/blackjack.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  constructor(private getDeck: BlackjackService) { }


  ngOnInit(): void {
    this.start();
  }

  ngAfterViewInit() : void{
    this.cartas2.push(this.card0);
    this.cartas2.push(this.card1);
    this.cartas2.push(this.card2);
    this.cartas2.push(this.card3);
    this.cartas2.push(this.card4);
    this.cartas2.push(this.card5);
    this.cartas2.push(this.card6);
    this.cartas2.push(this.card7);
    this.cartas2.push(this.card8);
    this.cartas2.push(this.card9);

  }

  @ViewChild('card0') card0 : any;
  @ViewChild('card1') card1 : any;
  @ViewChild('card2') card2 : any;
  @ViewChild('card3') card3 : any;
  @ViewChild('card4') card4 : any;
  @ViewChild('card5') card5 : any;
  @ViewChild('card6') card6 : any;
  @ViewChild('card7') card7 : any;
  @ViewChild('card8') card8 : any;
  @ViewChild('card9') card9 : any;

  cartas2 = [];


  deckid ?: Deckinit

  start(){
  this.getDeck.getdeck().subscribe(
    x =>{
     this.deckid = new Deckinit(x);
     this.getDeckCards();
    })
  }

  // Get de cartas, converaso de dados para Card(y)
  cartasUso : Array<Card> = [];
  getDeckCards(){
    if(this.deckid)
      this.getDeck.getCards(this.deckid.deck_id).subscribe(
        data =>
        {this.cartasUso = data['cards'].map(y=> new Card(y));
        });
  }
  //explicar que o maximo sao 5 cartas no relatório



  contador = 0;

  givecards(){
    // let cartas = Array.from(document.getElementsByClassName("verso") as HTMLCollectionOf<HTMLImageElement>);
      this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
      this.contador+=2;
    };

}
