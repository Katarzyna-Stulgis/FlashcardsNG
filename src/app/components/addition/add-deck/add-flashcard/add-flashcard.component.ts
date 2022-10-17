import { AddDeckComponent } from '../add-deck.component';
import { IFlashcard } from '../../../../interfaces/IFlashcard';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.css']
})
export class AddFlashcardComponent implements OnInit {
  public unique_key: number = 0;
  public parentRef: AddDeckComponent = {} as AddDeckComponent;

  flashcard: IFlashcard = {} as IFlashcard;

  constructor() { }

  ngOnInit(): void {
  }

  deleteFlashcard() {
    this.parentRef.remove(this.unique_key)
  }

}
