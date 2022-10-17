import { DeckService } from 'src/app/services/deck.service';
import { IDeck } from 'src/app/interfaces/IDeck';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditFolderComponent } from '../edit-folder/edit-folder.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit {
  @Output() decksUpdated = new EventEmitter<IDeck>();
  deckTemp: IDeck = {} as IDeck;
  deck: IDeck | undefined = {} as IDeck;

  constructor(
    public dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeck,
    private deckService: DeckService,

  ) { }

  async ngOnInit(): Promise<void> {
    const data = await this.deckService
      .getDeck(this.data.deckId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.deck = data
      });
  }

  SaveDeck() {
    this.EditDeck();
    this.dialogRef.close();
  }

  CloseDialog(): void {
    this.data.title = this.deck!.title;
    this.data.description = this.deck!.description;
    this.dialogRef.close();
  }

  EditDeck() {
    this.deckService
      .editDeck(this.data)
      .subscribe((deck: IDeck) => this.decksUpdated.emit(deck));
  }


}
