import { DeckService } from 'src/app/services/deck.service';
import { IDeck } from 'src/app/interfaces/IDeck';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditFolderComponent } from '../edit-folder/edit-folder.component';
import { take } from 'rxjs';

@Component({
  selector: 'app-delete-deck',
  templateUrl: './delete-deck.component.html',
  styleUrls: ['./delete-deck.component.css']
})
export class DeleteDeckComponent implements OnInit {
  deck: IDeck = {} as IDeck;

  constructor(
    public dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeck,
    private deckService: DeckService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  async Delete() {
    await this.deckService
      .deleteDeck(this.data.deckId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.dialogRef.close();
        this.router.navigate(['/decks']);
      });
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
