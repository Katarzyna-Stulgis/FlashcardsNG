import { IFlashcard } from './../../interfaces/IFlashcard';
import { AddFlashcardComponent } from './add-flashcard/add-flashcard.component';
import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { IDeck } from 'src/app/interfaces/IDeck';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent implements OnInit {
  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  VCR: ViewContainerRef = {} as ViewContainerRef;

  @Output() decksUpdated = new EventEmitter<IDeck>();

  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<AddFlashcardComponent>>()

  deck: IDeck = {} as IDeck;
  flashcards: IFlashcard[] = []

  constructor(
    private CFR: ComponentFactoryResolver,
    private deckService: DeckService
    ) {
  }

  ngOnInit(): void {
  }

  createComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(AddFlashcardComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  remove(key: number) {
    if (this.VCR.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      x => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.VCR.indexOf(componentRef.hostView);

    // removing component from container
    this.VCR.remove(vcrIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      x => x.instance.unique_key !== key
    );
  }

  SaveDeck() {
    this.componentsReferences.forEach(
      element => this.flashcards.push(element.instance.flashcard)
    );
    this.deck.flashcards = this.flashcards;

    this.AddDeck()
    console.log("saving")
  }

  AddDeck() {
    this.deckService
    .addDeck(this.deck)
    .subscribe((deck: IDeck) => this.decksUpdated.emit(deck))
  }
}
