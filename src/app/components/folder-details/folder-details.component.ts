import { RemoveDeckFromFolderComponent } from './../remove-deck-from-folder/remove-deck-from-folder.component';
import { IDeck } from 'src/app/interfaces/IDeck';
import { DeckService } from './../../services/deck.service';
import { AddDeckToFolderComponent } from '../add-deck-to-folder/add-deck-to-folder.component';
import { IFolder } from '../../interfaces/IFolder';
import { Component, OnInit } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFolderComponent } from '../edit-folder/edit-folder.component';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DeleteFolderComponent } from '../delete-folder/delete-folder.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.css']
})
export class FolderDetailsComponent implements OnInit {
  folder: IFolder = {} as IFolder;
  private routeSub: Subscription = {} as Subscription;
  private folderId: string = "";
  decks: IDeck[] | undefined = [];
  decksInFolder: IDeck[] | undefined = [];

  constructor(
    private folderService: FolderService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private deckService: DeckService,
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(params => {
      this.folderId = params['id']
    });

    const UserId = this.authService.getToken().UserId;

    await this.deckService
      .getDecks(UserId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.decks = data;
        this.decks?.forEach(element => {
          element.deckFolders.forEach(d => {
            if (d.folderId == this.folderId) {
              this.decksInFolder?.push(element)
            }
          })
        })
      })

    this.getFolder();
  }

  getFolder() {
    this.folderService
      .getFolder(this.folderId)
      .subscribe((result: IFolder) => this.folder = result);
  }

  editFolder(action: string): void {
    this.dialog.open(EditFolderComponent, {
      width: 'auto',
      data: { folder: this.folder, action: action },
    });
  }

  deleteFolder() {
    this.dialog.open(DeleteFolderComponent, {
      width: 'auto',
      data: { folder: this.folder },
    });
  }

  addDeckToFolder() {
    this.dialog.open(AddDeckToFolderComponent, {
      width: 'auto',
      data: this.folder,
    });
  }

  remodeDeckFormFolder() {
    this.dialog.open(RemoveDeckFromFolderComponent, {
      width: 'auto',
      data: this.folder,
    });
  }

}
