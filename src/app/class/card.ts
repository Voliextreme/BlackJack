export class Card {
  image: string;
  value: string;
  suit: string;
  code: string;

  constructor(cartaRecebida : any){
    this.image = cartaRecebida.image;
    this.value = cartaRecebida.value;
    this.suit = cartaRecebida.suit;
    this.code = cartaRecebida.code;
  }

}
