import { FlashcardService } from './../../../services/flashcard.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { IDeck } from 'src/app/interfaces/IDeck';
import { IFlashcard } from 'src/app/interfaces/IFlashcard';
import { DeckService } from 'src/app/services/deck.service';
import { EditFlashcardComponent } from '../../edit-flashcard/edit-flashcard.component';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';

@Component({
  selector: 'app-learn-flashcards',
  templateUrl: './learn-flashcards.component.html',
  styleUrls: ['./learn-flashcards.component.css']
})
export class LearnFlashcardsComponent implements OnInit {
  deck: IDeck | undefined = {} as IDeck;
  deckId: string = "";
  private routeSub: Subscription = {} as Subscription;
  flashcards: IFlashcard[] | undefined = [];
  currentFlashcard: string | undefined = "";
  iterator: number = 0;
  flashcardNumber: string = "";
  progressBarValue: number = 0;

  constructor(
    public dialog: MatDialog,
    private deckService: DeckService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.params.subscribe(params => {
      this.deckId = params['id']
    });

    const data = await this.deckService
      .getDeck(this.deckId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.deck = data
        this.flashcards = data?.flashcards
        this.currentFlashcard = data?.flashcards[this.iterator].question
        this.flashcardNumber = this.iterator + 1 + " / " + this.flashcards?.length!
        this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100
      });
  }

  getDeck() {
    this.deckService
      .getDeck(this.deckId)
      .subscribe((result: IDeck) => this.deck = result)
  }

  ReverseFlashcard() {
    if (this.currentFlashcard == this.flashcards![this.iterator].question) {
      this.currentFlashcard = this.flashcards![this.iterator].answer
    }
    else {
      this.currentFlashcard = this.flashcards![this.iterator].question
    }
  }

  Shuffle() {
    this.flashcards = this.flashcards?.sort(() => Math.random() - 0.5)
    this.iterator = 0;
    this.currentFlashcard = this.flashcards![this.iterator].question
    this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100
  }

  Next() {
    ++this.iterator;

    if (this.iterator >= this.flashcards?.length!) {
      this.iterator = 0;
    }

    this.currentFlashcard = this.flashcards![this.iterator].question;
    this.flashcardNumber = this.iterator + 1 + " / " + this.flashcards?.length!
    this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100
  }

  Previous() {
    --this.iterator;

    if (this.iterator < 0) {
      this.iterator = this.flashcards?.length! - 1;
    }

    this.currentFlashcard = this.flashcards![this.iterator].question;
    this.flashcardNumber = this.iterator + 1 + " / " + this.flashcards?.length!
    this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100
  }

  openDialog(): void {
    this.flashcards![this.iterator].deckId = this.deckId;
    const dialogRef = this.dialog.open(EditFlashcardComponent, {
      width: 'auto',
      data: this.flashcards![this.iterator]
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
      console.log('The dialog was closed');
    });
  }

}
