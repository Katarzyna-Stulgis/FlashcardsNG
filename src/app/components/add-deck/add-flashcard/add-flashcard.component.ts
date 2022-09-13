import { IFlashcard } from './../../../interfaces/IFlashcard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.css']
})
export class AddFlashcardComponent implements OnInit {
  @Input() flashcard: IFlashcard = {} as IFlashcard;
  @Output() flashcardEmitter = new EventEmitter<IFlashcard>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteFlashcard() {
    console.log(this.flashcard);
    this.flashcardEmitter.emit(this.flashcard);
  }

}
