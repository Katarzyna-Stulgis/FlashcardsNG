import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { IDeck } from 'src/app/interfaces/IDeck';

@Component({
  selector: 'app-share-deck',
  templateUrl: './share-deck.component.html',
  styleUrls: ['./share-deck.component.css']
})
export class ShareDeckComponent implements OnInit {
  deckId: string = "";
  constructor(
    public dialogRef: MatDialogRef<ShareDeckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeck,
    private clipboardApi: ClipboardService
  ) { }

  ngOnInit(): void {
    this.deckId = this.data.deckId;
  }

  Close() {
    this.dialogRef.close();
  }

  copyText() {
    this.clipboardApi.copyFromContent(this.deckId)
  }

}
