import { DeckService } from './../../services/deck.service';
import { IDeck } from './../../interfaces/IDeck';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {

  decks: IDeck[] = [];

  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks() {
    this.deckService
      .getDecks()
      .subscribe((result: IDeck[]) => this.decks = result);
  }
}
