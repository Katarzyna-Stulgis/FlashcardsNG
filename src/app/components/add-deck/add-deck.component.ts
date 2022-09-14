import { AddFlashcardComponent } from './add-flashcard/add-flashcard.component';
import { IDeck } from './../../interfaces/IDeck';
import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent implements OnInit {
 // visibilityTypes: string[] = ['Publiczny', 'Prywatny'];
  selectedType: string = '';
  deck: IDeck = {} as IDeck;
  public loadComponent: any[] = [];

  @ViewChild('container', {read:ViewContainerRef})
  container!:ViewContainerRef;
  

  constructor() {
   }

  ngOnInit(): void {
  }

  addFlashcardComponent() {
    this.loadComponent.push(1);
  }

  removeComponent(componentIndex:number){
    this.loadComponent.splice(componentIndex,1);
  } 

 /*  getvisibilityType() {
    switch (this.selectedType) {
      case 'Publiczny':
        this.deck.visibilityType = 0;
        break;
      case 'Prywatny':
        this.deck.visibilityType = 1;
        break;
    }
  } */

  SaveDeck() {
    console.log(this.selectedType);
/*     this.getvisibilityType(); */

    console.log(this.deck);

    //zapysywanie decku do bazy
  }
}
