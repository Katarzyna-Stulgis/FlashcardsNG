import { AuthService } from 'src/app/services/auth.service';
import { DeckService } from '../../../services/deck.service';
import { IDeck } from '../../../interfaces/IDeck';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent implements OnInit {

  decks: IDeck[] = [];

  constructor(
    private deckService: DeckService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getDecks();
  }

  getDecks() {
    const UserId = this.authService.getToken().UserId
    this.deckService
      .getDecks(UserId)
      .subscribe((result: IDeck[]) => this.decks = result);
  }
}
