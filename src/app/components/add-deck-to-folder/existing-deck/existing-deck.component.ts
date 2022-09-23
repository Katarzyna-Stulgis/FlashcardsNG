import { DeckService } from './../../../services/deck.service';
import { IDeck } from 'src/app/interfaces/IDeck';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { IDeckFolder } from 'src/app/interfaces/IDeckFolder';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFolder } from 'src/app/interfaces/IFolder';
import { AddDeckComponent } from '../../add-deck/add-deck.component';

@Component({
  selector: 'app-existing-deck',
  templateUrl: './existing-deck.component.html',
  styleUrls: ['./existing-deck.component.css']
})
export class ExistingDeckComponent implements OnInit {
  @Input() deck: IDeck = {} as IDeck
  @Input() folderId: string = "";

  isAdded: boolean = false;

  constructor(
    private deckService: DeckService,
    public dialogRef: MatDialogRef<AddDeckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFolder,) { }

  async ngOnInit(): Promise<void> {
    await this.deckService
      .getDeck(this.deck.deckId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.deck.deckFolders.forEach(element=>{
        console.log(element)
        })
      });
      
  }

  async add() {
    if (this.folderId != undefined) {
      var deckFolder: IDeckFolder = {
        folderId: this.folderId,
      }
      this.deck.deckFolders = [];
      this.deck.deckFolders.push(deckFolder);
    }

    await this.deckService
      .editDeck(this.deck)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.isAdded = true
        this.dialogRef.close();
        window.location.reload();
      });
  }
}
