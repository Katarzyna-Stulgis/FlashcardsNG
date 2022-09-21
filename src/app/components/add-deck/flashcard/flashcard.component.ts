import { AddDeckComponent } from '../add-deck.component';
import { IFlashcard } from '../../../interfaces/IFlashcard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  public unique_key: number = 0;
  public parentRef: AddDeckComponent = {} as AddDeckComponent;

  flashcard: IFlashcard = {} as IFlashcard;

  constructor() { }

  ngOnInit(): void {
  }

  deleteFlashcard() {
    console.log(this.unique_key)
    this.parentRef.remove(this.unique_key)
  }

}
