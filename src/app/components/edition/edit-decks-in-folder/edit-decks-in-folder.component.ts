import { FolderService } from '../../../services/folder.service';
import { DeckService } from 'src/app/services/deck.service';
import { IFolder } from 'src/app/interfaces/IFolder';
import { AddDeckComponent } from '../../addition/add-deck/add-deck.component';
import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { IDeck } from 'src/app/interfaces/IDeck';

export interface IDeckCheckBox {
  deck: IDeck;
  completed: boolean;
}

@Component({
  selector: 'app-edit-decks-in-folder',
  templateUrl: './edit-decks-in-folder.component.html',
  styleUrls: ['./edit-decks-in-folder.component.css']
})
export class EditDecksInFolderComponent implements OnInit {
  @Output() foldersUpdated = new EventEmitter<IFolder>();
  decks: IDeck[] = [];
  decksCheckBox: IDeckCheckBox[] | undefined = [];
  folder: IFolder = {} as IFolder;
  isAdded: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddDeckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFolder,
    public router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private deckService: DeckService,
    private folderService: FolderService
  ) { }

  async ngOnInit(): Promise<void> {
    const UserId = this.authService.getToken().UserId;
    await this.deckService
      .getDecks(UserId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        data?.forEach(d => {
          this.data.decks?.forEach(fd => {
            if (d.deckId === fd.deckId) {
              var deck = {
                deck: fd,
                completed: true,
              } as IDeckCheckBox;
              this.decksCheckBox?.push(deck);
              this.isAdded = true;
            }
          })
          if (this.isAdded == false) {
            var deck = {
              deck: d,
              completed: false,
            } as IDeckCheckBox;
            this.decksCheckBox?.push(deck);
          }
          this.isAdded = false;
        })
      })
  }

  addNewDeck() {
    var UserId = this.authService.getToken().UserId;
    this.router.navigate(['/folders/add-deck-to-folder', this.data.folderId]);
    this.dialogRef.close();
  }

  async Submit() {
    this.decksCheckBox?.forEach(d => {
      if (d.completed == true) {
        this.decks.push(d.deck);
      }
    })

    this.data.decks = this.decks;

    await this.folderService
      .editFolder(this.data)
      .subscribe((folder: IFolder) => {
        this.foldersUpdated.emit(folder);
        this.dialogRef.close();
        window.location.reload();
      });
  }

  updateAllComplete() {
    this.decksCheckBox?.every(d => d.completed);
  }

  CloseDialog() {
    this.dialogRef.close();
  }
}
