import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { IDeck } from 'src/app/interfaces/IDeck';
import { IFolder } from 'src/app/interfaces/IFolder';
import { AuthService } from 'src/app/services/auth.service';
import { DeckService } from 'src/app/services/deck.service';
import { AddDeckComponent } from '../add-deck/add-deck.component';

@Component({
  selector: 'app-remove-deck-from-folder',
  templateUrl: './remove-deck-from-folder.component.html',
  styleUrls: ['./remove-deck-from-folder.component.css']
})
export class RemoveDeckFromFolderComponent implements OnInit {
  decks: IDeck[] | undefined = [];
  decksInFolder: IDeck[] | undefined = [];
  decksNotInFolder: IDeck[] | undefined = [];

  constructor(
    public dialogRef: MatDialogRef<AddDeckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFolder,
    private authService: AuthService,
    private deckService: DeckService

  ) { }

  async ngOnInit(): Promise<void> {
    const UserId = this.authService.getToken().UserId
    await this.deckService
      .getDecks(UserId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.decks = data;
        this.decks?.forEach(element => {
          element.deckFolders.forEach(d => {
            if (d.folderId == this.data.folderId) {
              this.decksInFolder?.push(element)
            }
          })
        })
        this.decksInFolder = this.decks?.filter(x => !this.decksNotInFolder?.includes(x))
      })
  }


  CloseDialog() {
    this.dialogRef.close();
  }

}
