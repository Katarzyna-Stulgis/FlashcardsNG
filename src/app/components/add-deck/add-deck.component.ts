import { IDeck } from './../../interfaces/IDeck';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent implements OnInit {
  visibilityTypes: string[] = ['Publiczny', 'Prywatny'];
  selectedType: string = '';
  deck: IDeck = {} as IDeck;

  constructor() { }

  ngOnInit(): void {
  }

  addFlashcardComponent() {
    //dodawanie komponentu fiszka do widoku
  }
  getvisibilityType() {
    switch (this.selectedType) {
      case 'Publiczny':
        this.deck.visibilityType = 0;
        break;
        case 'Prywatny':
          this.deck.visibilityType = 1;
        break;
    }
  }

  SaveDeck() {
    console.log(this.selectedType);
    this.getvisibilityType();

    console.log(this.deck);

    //zapysywanie decku do bazy
  }
}
