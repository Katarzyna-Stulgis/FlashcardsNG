import { DeckService } from './../../services/deck.service';
import { IDeck } from './../../interfaces/IDeck';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css']
})
export class DeckDetailsComponent implements OnInit {
  deck: IDeck = {} as IDeck;
  deckId: string = "";
  private routeSub: Subscription = {} as Subscription;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.deckId = params['id']
    });

    this.getDeck();
  }

  getDeck() {
    this.deckService
      .getDeck(this.deckId)
      .subscribe((result: IDeck) => this.deck = result)
  }

}
