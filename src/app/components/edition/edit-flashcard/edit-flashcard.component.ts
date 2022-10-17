import { IFlashcard } from '../../../interfaces/IFlashcard';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlashcardService } from 'src/app/services/flashcard.service';
import { IDialogFlashcardData } from 'src/app/interfaces/IDialogFlashcardData';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './edit-flashcard.component.html',
  styleUrls: ['./edit-flashcard.component.css']
})
export class EditFlashcardComponent implements OnInit {

  @Output() flashcardsUpdated = new EventEmitter<IFlashcard>();
  flashcardTemp: IFlashcard = {} as IFlashcard;
  actionName: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditFlashcardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogFlashcardData,
    private flashcardService: FlashcardService
  ) { }

  ngOnInit(): void {
    switch (this.data.action) {
      case 'add':
        this.actionName = 'Nowy Fiszka';
        break;
      case 'edit':
        this.getFlashcard();
        this.actionName = 'Edycja Fiszki';
        break;
    }
  }

  SaveFlashcard() {
    switch (this.data.action) {
      case 'add':
        this.AddFlashcard();
        window.location.reload();
        break;
      case 'edit':
        this.EditFlashcard();
        break;
    }
    this.dialogRef.close();
    this.flashcardService
      .editFlashcard(this.data.flashcard)
      .subscribe((flashcard: IFlashcard) => this.flashcardsUpdated.emit(flashcard));
  }

  EditFlashcard() {
    this.flashcardService
      .editFlashcard(this.data.flashcard)
      .subscribe((flashcard: IFlashcard) => this.flashcardsUpdated.emit(flashcard))
  }

  AddFlashcard() {
    this.data.flashcard.flashcardId = "00000000-0000-0000-0000-000000000000";
    this.flashcardService
    .addFlashcard(this.data.flashcard)
    .subscribe((folders: IFlashcard) => this.flashcardsUpdated.emit(folders));
  }

  CloseDialog() {
    switch (this.data.action) {
      case 'add':
        this.data.flashcard.question = '';
        this.data.flashcard.answer = '';
        break;
      case 'edit':
        this.data.flashcard.question = this.flashcardTemp.question;
        this.data.flashcard.answer = this.flashcardTemp.answer;
        break;
    }
    this.dialogRef.close();
  }

  getFlashcard() {
    this.flashcardService
      .getFlashcard(this.data.flashcard.flashcardId)
      .subscribe((result: IFlashcard) => this.flashcardTemp = result)
  }
}
