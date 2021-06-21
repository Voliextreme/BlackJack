import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from 'src/app/class/card';
import { Deckinit } from 'src/app/class/deckinit';
import { BlackjackService } from 'src/app/services/blackjack.service';
import { SaldoService } from 'src/app/services/saldo.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  saldo : SaldoService
  constructor(private getDeck: BlackjackService, private getSaldo : SaldoService) { 
    this.saldo = getSaldo;
  }


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

  // Verificar se é necessario
  @ViewChild('dealer') dealer : any;
  @ViewChild('player') player : any;

  @ViewChild('startdiv') startdiv : any;

  cartas2 = [];
  deckid ?: Deckinit

  start(){
  this.getDeck.getdeck().subscribe(
    x =>{
     this.deckid = new Deckinit(x);
     this.getDeckCards();
     console.log(this.deckid)
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
  pontosPlayer = 0;
  pontosDealer = 0;

  verificar(){
    if (this.pontosPlayer > 21) {
      return 'loser'
    } else if (this.pontosPlayer < 21 && this.pontosDealer < 21 && this.pontosPlayer > this.pontosDealer) {
      return 'winner'
    } else if (this.pontosPlayer == this.pontosDealer) {
      return 'tie'
    } else if (this.pontosPlayer < 21 && this.pontosDealer < 21 && this.pontosPlayer < this.pontosDealer) {
      return 'loser'
    } else if (this.pontosDealer > 21) {
      return 'winner'
    } else if (this.pontosDealer == 21) {
      return 'loser'
    } else if (this.pontosPlayer == 21) {
      return 'blackjack'
    } 
    return "0";
  }

  showChips : boolean = false;
  play(){
    this.showChips = true;
    this.startdiv.nativeElement.style.display = "none";
    this.start();
    this.givecards();

  }

  @ViewChild('decisao') decisao : any;
  givecards(){
    
    if(this.contador != 3){
      this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
      this.cartas2[this.contador].nativeElement.style.display = "block";
      if(this.contador % 2 == 0){
        if(parseInt(this.cartasUso[this.contador].value) == 11 && (parseInt(this.cartasUso[this.contador].value) + this.pontosPlayer) > 22){
          this.cartasUso[this.contador].value = "1";
        }
        this.pontosPlayer += parseInt(this.cartasUso[this.contador].value);
      }else{
        if(parseInt(this.cartasUso[this.contador].value) == 11 && (parseInt(this.cartasUso[this.contador].value) + this.pontosPlayer) > 22){
          this.cartasUso[this.contador].value = "1";
        }
        this.pontosDealer += parseInt(this.cartasUso[this.contador].value);
      }
      this.contador++;
      setTimeout(() => {
        this.givecards();
      }, 600);
    }else {
      this.cartas2[this.contador].nativeElement.src = "../../../assets/Images/card.png";
      this.cartas2[this.contador].nativeElement.style.display = "block";
      this.decisao.nativeElement.style.display = "flex";
      this.contador++;
    }
  };

  hit(){
    if(this.pontosPlayer < 21){
      this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
      this.cartas2[this.contador].nativeElement.style.display = "block";
      if(parseInt(this.cartasUso[this.contador].value) == 11 && (parseInt(this.cartasUso[this.contador].value) + this.pontosPlayer) > 22){
        this.cartasUso[this.contador].value = "1";
      }
      this.pontosPlayer += parseInt(this.cartasUso[this.contador].value);
      this.contador+=2;
      /*Verificar se é maior ou igual ou nao -------------------------------------------------------------------------------------------------*/ 
      if(this.pontosPlayer > 21){
        this.contador = 3;
        setTimeout(() => {
          this.dealerCards();
        }, 600);  
      }
    }
  }

  @ViewChild('result') result : any;
  @ViewChild('h1') h1 : any;
  @ViewChild('page') page : any;

  verify :any;
dealerCards(){
  if(this.pontosPlayer < 22 || this.stayoption == true){
    if(this.pontosDealer <= 16 && this.pontosDealer < this.pontosPlayer || this.pontosDealer <= 16 && this.pontosDealer == this.pontosPlayer){
      this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
      this.cartas2[this.contador].nativeElement.style.display = "block";
      if(parseInt(this.cartasUso[this.contador].value) == 11 && (parseInt(this.cartasUso[this.contador].value) + this.pontosDealer) > 22){
        this.cartasUso[this.contador].value = "1";
      }
      this.pontosDealer += parseInt(this.cartasUso[this.contador].value);
      this.contador+=2;
      setTimeout(() => {
        this.dealerCards();
      }, 600);
    }else{
      this.verify  = this.verificar();
      this.fim(this.verify);
    }
  }else{
    this.cartas2[this.contador].nativeElement.src = this.cartasUso[this.contador].image;
    this.cartas2[this.contador].nativeElement.style.display = "block";
    this.verify  = this.verificar();
    this.fim(this.verify);
  }
  
}

stayoption : boolean;
stay(){
  this.stayoption = true;
  this.contador = 3;
  this.dealerCards();
}

fim(verify){
  this.result.nativeElement.style.display = "flex";
  if(verify == "winner"){
    this.h1.nativeElement.textContent ="Winner";
    this.saldo.Playersaldo.saldo += this.aposta
  }else if(verify == "loser"){
    this.h1.nativeElement.textContent ="Lose";
    this.aposta -= 2*this.aposta;
    this.saldo.Playersaldo.saldo += this.aposta
  }else if(verify == "tie"){
    this.h1.nativeElement.textContent ="Tie";
  }else if(verify == "blackjack"){
    this.h1.nativeElement.textContent ="BlackJack";
    this.saldo.Playersaldo.saldo += 1.5*this.aposta
  }
}

reset(){
  setTimeout(() => {
    this.contador = 0;
    this.pontosPlayer = 0;
    this.pontosDealer = 0;
    this.stayoption = false;
    this.aposta = 0;
    this.result.nativeElement.style.display = "none";
    for (let i = 0; i < 10; i++) {
    this.cartas2[i].nativeElement.style.display = "none";
    }
    this.startdiv.nativeElement.style.display = "flex";
    this.decisao.nativeElement.style.display="none";
    this.showChips = false;
  }, 600);
}

aposta : any = 0;
aumentarAposta(valor : any){
  if(this.aposta + valor <= this.saldo.Playersaldo.saldo){
    this.aposta += Number(valor);
  }
}

leave(){
  console.log(this.getSaldo.Playersaldo.saldo);
}

}