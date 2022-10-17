import { DeleteFlashcardComponent } from './../../delete-flashcard/delete-flashcard.component';
import { EditFlashcardComponent } from './../../edit-flashcard/edit-flashcard.component';
import { IFlashcard } from './../../../interfaces/IFlashcard';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-deck-flashcard',
  templateUrl: './deck-flashcard.component.html',
  styleUrls: ['./deck-flashcard.component.css']
})
export class DeckFlashcardComponent implements OnInit {

  @Input() flashcard: IFlashcard = {} as IFlashcard
  @Input() deckId: string = "";
  @Input() isEditable: boolean= false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.flashcard.deckId = this.deckId;
  }

  openDialog(action: string): void {
    if (action == 'edit') {
      this.dialog.open(EditFlashcardComponent, {
        width: 'auto',
        data: { flashcard: this.flashcard, action: action },
      });
    }
    else if (action == 'delete') {
      this.dialog.open(DeleteFlashcardComponent, {
        width: 'auto',
        data: this.flashcard
      });
    }
  }

}
