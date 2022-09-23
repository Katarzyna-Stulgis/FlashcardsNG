import { IDeckFolder } from './../../interfaces/IDeckFolder';
import { AuthService } from 'src/app/services/auth.service';
import { IDeckUser } from '../../interfaces/IDeckUser';
import { IFlashcard } from '../../interfaces/IFlashcard';
import { FlashcardComponent } from './flashcard/flashcard.component';
import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { IDeck } from 'src/app/interfaces/IDeck';
import { DeckService } from 'src/app/services/deck.service';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
  componentsReferences = Array<ComponentRef<FlashcardComponent>>()

  deck: IDeck | undefined = {} as IDeck;
  flashcards: IFlashcard[] = [];

  folderId: string = "";
  private routeSub: Subscription = {} as Subscription;
  actionName: string = "";

  token: string | undefined = '';

  constructor(
    private CFR: ComponentFactoryResolver,
    private deckService: DeckService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(params => {
      this.folderId = params['id']
    });
    console.log(this.folderId)
    this.actionName = "Tworzenie nowego zestawu"
  }

  async SaveDeck() {
    this.componentsReferences.forEach(
      element => this.flashcards.push(element.instance.flashcard)
    );
    this.deck!.flashcards = this.flashcards;

    var deckUser: IDeckUser = {
      isEditable: true,
      userId: this.authService.getToken().UserId,
    }
    this.deck!.deckUsers = [];
    this.deck!.deckUsers.push(deckUser);

    if (this.folderId != undefined) {
      var deckFolder: IDeckFolder = {
        folderId: this.folderId,
      }
      this.deck!.deckFolders = [];
      this.deck!.deckFolders.push(deckFolder);
    }

    console.log(this.deck)

    //saving
    await this.deckService
      .addDeck(this.deck!)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.router.navigate(['/decks']);
      });
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
