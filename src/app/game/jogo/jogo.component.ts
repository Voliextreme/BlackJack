import { Component, OnInit } from '@angular/core';
import { asapScheduler } from 'rxjs';
import { BlackjackService } from 'src/app/services/blackjack.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  constructor(private getDeck: BlackjackService) { }

  ngOnInit(): void {
    this.getDeckCards();
  }

  result : any = "";
  getDeckCards(){
    this.getDeck.getDecks().subscribe(data => {this.result = data; console.log(this.result)});
  }
  
  givecards(){
    document.getElementsByClassName("#dealer");

  }
}
