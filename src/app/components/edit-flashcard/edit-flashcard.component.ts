import { IFlashcard } from './../../interfaces/IFlashcard';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlashcardService } from 'src/app/services/flashcard.service';

@Component({
  selector: 'app-flashcard',
  templateUrl: './edit-flashcard.component.html',
  styleUrls: ['./edit-flashcard.component.css']
})
export class EditFlashcardComponent implements OnInit {

  @Output() flashcardsUpdated = new EventEmitter<IFlashcard>();
  flashcardTemp: IFlashcard = {} as IFlashcard;

  constructor(
    public dialogRef: MatDialogRef<EditFlashcardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFlashcard,
    private flashcardService: FlashcardService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.getFlashcard();
  }

  SaveFlashcard() {
    this.flashcardService
      .editDeck(this.data)
      .subscribe((flashcard: IFlashcard) => this.flashcardsUpdated.emit(flashcard))
    this.dialogRef.close();
  }

  CloseDialog() {
    this.data.question = this.flashcardTemp.question;
    this.data.answer = this.flashcardTemp.answer;
    this.dialogRef.close();
  }

  getFlashcard() {
    this.flashcardService
      .getFlashcard(this.data.flashcardId)
      .subscribe((result: IFlashcard) => this.flashcardTemp = result)
  }
}
