import { DeleteDeckComponent } from './../delete-deck/delete-deck.component';
import { IFlashcard } from 'src/app/interfaces/IFlashcard';
import { EditFlashcardComponent } from './../edit-flashcard/edit-flashcard.component';
import { EditDeckComponent } from './../edit-deck/edit-deck.component';
import { DeckService } from './../../services/deck.service';
import { IDeck } from './../../interfaces/IDeck';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-details',
  templateUrl: './deck-details.component.html',
  styleUrls: ['./deck-details.component.css']
})
export class DeckDetailsComponent implements OnInit {
  deck: IDeck = {} as IDeck;
  flashcard: IFlashcard = {} as IFlashcard;
  deckId: string = "";
  private routeSub: Subscription = {} as Subscription;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    public dialog: MatDialog
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

  openDialog(name: string): void {
    if (name == 'edit-deck') {
      const dialogRef = this.dialog.open(EditDeckComponent, {
        width: 'auto',
        data: this.deck
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    else if (name == 'add-flashcard') {
      this.flashcard.deckId = this.deckId;
      this.dialog.open(EditFlashcardComponent, {
        width: 'auto',
        data: { flashcard: this.flashcard, action: "add" }
      });
    }
    else if (name == 'delete-deck') {
      this.flashcard.deckId = this.deckId;
      this.dialog.open(DeleteDeckComponent, {
        width: 'auto',
        data: this.deck
      });
    }
  }
}
