import { IDeckUser } from '../../../interfaces/IDeckUser';
import { DeckUserService } from '../../../services/deck-user.service';
import { DeleteDeckComponent } from '../../deletion/delete-deck/delete-deck.component';
import { IFlashcard } from 'src/app/interfaces/IFlashcard';
import { EditFlashcardComponent } from '../../edition/edit-flashcard/edit-flashcard.component';
import { EditDeckComponent } from '../../edition/edit-deck/edit-deck.component';
import { DeckService } from '../../../services/deck.service';
import { IDeck } from '../../../interfaces/IDeck';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShareDeckComponent } from '../../share/share-deck/share-deck.component';
import { AuthService } from 'src/app/services/auth.service';

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
  isEditable: boolean = false;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private deckUserService: DeckUserService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.deckId = params['id']
    });

    this.getDeck();
    this.getdeckFolder();
  }

  async getDeck() {
    await this.deckService
      .getDeck(this.deckId)
      .subscribe((result: IDeck) => this.deck = result)
  }

  async getdeckFolder() {
    var userId = this.authService.getToken().UserId;
    await this.deckUserService
      .getDeckUser(userId, this.deckId)
      .subscribe((result: IDeckUser) => this.isEditable = result.isEditable);
  }

  openDialog(name: string): void {
    if (name == 'edit-deck') {
      this.dialog.open(EditDeckComponent, {
        width: 'auto',
        data: this.deck
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
        data: { deck: this.deck, isEditable: this.isEditable }
      });
    }
    else if (name == 'share-deck') {
      this.flashcard.deckId = this.deckId;
      this.dialog.open(ShareDeckComponent, {
        width: 'auto',
        data: this.deck
      });
    }
  }
}
