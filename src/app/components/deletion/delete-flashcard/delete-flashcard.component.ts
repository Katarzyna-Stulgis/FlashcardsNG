import { FlashcardService } from 'src/app/services/flashcard.service';
import { EditDeckComponent } from '../../edition/edit-deck/edit-deck.component';
import { IFlashcard } from 'src/app/interfaces/IFlashcard';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-delete-flashcard',
  templateUrl: './delete-flashcard.component.html',
  styleUrls: ['./delete-flashcard.component.css']
})
export class DeleteFlashcardComponent implements OnInit {
  flashcard: IFlashcard = {} as IFlashcard;
  private routeSub: Subscription = {} as Subscription;
  deckId: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditDeckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFlashcard,
    private flashcardService: FlashcardService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.deckId = this.data.deckId;
  }

  async Delete() {
    await this.flashcardService
      .deleteFlashcard(this.data.flashcardId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.dialogRef.close();
        window.location.reload();
      });
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
