import { IDeckUser } from '../../interfaces/IDeckUser';
import { IFlashcard } from '../../interfaces/IFlashcard';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { IDeck } from 'src/app/interfaces/IDeck';
import { DeckService } from 'src/app/services/deck.service';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-deck',
  templateUrl: './edit-deck.component.html',
  styleUrls: ['./edit-deck.component.css']
})
export class EditDeckComponent implements OnInit {
  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  VCR: ViewContainerRef = {} as ViewContainerRef;

  @Output() decksUpdated = new EventEmitter<IDeck>();

  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<FlashcardComponent>>()

  deck: IDeck | undefined = {} as IDeck;
  flashcards: IFlashcard[] = [];

  deckId: string = "";
  private routeSub: Subscription = {} as Subscription;
  actionName: string = "";

  constructor(
    private CFR: ComponentFactoryResolver,
    private deckService: DeckService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(params => {
      this.deckId = params['id']
    });

    if (this.deckId == undefined) {
      this.actionName = "Tworzenie nowego zestawu"
    }
    else {
      this.actionName = "Edycja zestawu"

      const data = await this.deckService
        .getDeck(this.deckId)
        .pipe(take(1))
        .toPromise()
        .then(data => {
          this.deck = data,
            console.log(this.deck)
        });
    }
  }

  SaveDeck() {
    if (this.deckId == undefined) {
      this.componentsReferences.forEach(
        element => this.flashcards.push(element.instance.flashcard)
      );
      this.deck!.flashcards = this.flashcards;

      var deckUser: IDeckUser = {
        isEditable: true,
        userId: '6b81215f-4b26-4493-93b0-b508dc91921b',
        /*    deckId: '' */
      }
      this.deck!.deckUsers = [];
      this.deck!.deckUsers.push(deckUser);

      console.log(this.deck)

      this.AddDeck();
      console.log("saving");
    }
    else {
      console.log(this.deck?.title);
      console.log(this.deck?.description);


      this.EditDeck();
    }
  }

  AddDeck() {
    this.deckService
      .addDeck(this.deck!)
      .subscribe((deck: IDeck) => this.decksUpdated.emit(deck))
  }

  EditDeck() {
    this.deckService
      .editDeck(this.deck!)
      .subscribe((deck: IDeck) => this.decksUpdated.emit(deck));

  }

  createComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(FlashcardComponent);

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

}
