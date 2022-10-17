import { IDeckUser } from './../../interfaces/IDeckUser';
import { DeckUserService } from './../../services/deck-user.service';
import { DeckService } from 'src/app/services/deck.service';
import { IDeck } from 'src/app/interfaces/IDeck';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditFolderComponent } from '../edit-folder/edit-folder.component';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-delete-deck',
  templateUrl: './delete-deck.component.html',
  styleUrls: ['./delete-deck.component.css']
})
export class DeleteDeckComponent implements OnInit {
  deck: IDeck = {} as IDeck;

  constructor(
    public dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { deck: IDeck, isEditable: boolean },
    private deckService: DeckService,
    private deckUserService: DeckUserService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  async Delete() {
    if (this.data.isEditable == true) {
      await this.deckService
        .deleteDeck(this.data.deck.deckId)
        .pipe(take(1))
        .toPromise()
        .then(data => {
          this.dialogRef.close();
          this.router.navigate(['/decks']);
        });
    }
    else {
      var deckUser = {
        deckId: this.data.deck.deckId,
        userId: this.authService.getToken().UserId,
        isEditable: this.data.isEditable
      } as IDeckUser;
      
      await this.deckUserService
        .deleteListElement(deckUser)
        .pipe(take(1))
        .toPromise()
        .then(data => {
          this.dialogRef.close();
          this.router.navigate(['/decks']);
        });
    }
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
