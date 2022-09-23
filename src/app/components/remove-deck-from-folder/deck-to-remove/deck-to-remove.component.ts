import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { IDeck } from 'src/app/interfaces/IDeck';
import { IDeckFolder } from 'src/app/interfaces/IDeckFolder';
import { IFolder } from 'src/app/interfaces/IFolder';
import { DeckService } from 'src/app/services/deck.service';
import { AddDeckComponent } from '../../add-deck/add-deck.component';

@Component({
  selector: 'app-deck-to-remove',
  templateUrl: './deck-to-remove.component.html',
  styleUrls: ['./deck-to-remove.component.css']
})
export class DeckToRemoveComponent implements OnInit {
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

async remove() {
  if (this.folderId != undefined) {
    var deckFolder: IDeckFolder = {
      folderId: this.folderId,
    }

    this.deck.deckFolders.pop();
    console.log(this.deck.deckFolders)
  }

  await this.deckService
    .editDeck(this.deck)
    .pipe(take(1))
    .toPromise()
    .then(data => {
      this.isAdded = true
      //this.dialogRef.close();
    //  window.location.reload();
    });
}
}
