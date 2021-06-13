import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlackjackService {

  constructor(private httpAsk : HttpClient) { }


  link = "https://deckofcardsapi.com/api/deck/gfza4vr5iw4n/draw/?count=10"


  getDecks(){
    return this.httpAsk.get(this.link);
  };

}

