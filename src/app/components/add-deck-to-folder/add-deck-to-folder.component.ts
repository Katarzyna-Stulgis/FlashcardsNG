import { DeckService } from 'src/app/services/deck.service';
import { IFolder } from 'src/app/interfaces/IFolder';
import { AddDeckComponent } from './../add-deck/add-deck.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';
import { IDeck } from 'src/app/interfaces/IDeck';

@Component({
  selector: 'app-add-deck-to-folder',
  templateUrl: './add-deck-to-folder.component.html',
  styleUrls: ['./add-deck-to-folder.component.css']
})
export class AddDeckToFolderComponent implements OnInit {
  decks: IDeck[] | undefined = [];
  decksInFolder: IDeck[] | undefined = [];
  decksNotInFolder: IDeck[] | undefined = [];

  constructor(
    public dialogRef: MatDialogRef<AddDeckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFolder,
    public router: Router,
    private route: ActivatedRoute,
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
        this.decksNotInFolder = this.decks?.filter(x => !this.decksInFolder?.includes(x))
      })
  }

  addNewDeck() {
    var UserId = this.authService.getToken().UserId;
    this.router.navigate(['/folders/add-deck-to-folder', this.data.folderId]);
    this.dialogRef.close();
  }

  Submit() {
    this.dialogRef.close();
    this.router.navigate(['/folders/', this.data.folderId]);
  }

  CloseDialog() {
    this.dialogRef.close();
  }
}
