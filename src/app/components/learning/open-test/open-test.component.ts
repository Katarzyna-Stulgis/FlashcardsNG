import { IFlashcardTest } from './../../../interfaces/IFlashcardTest';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { IDeck } from 'src/app/interfaces/IDeck';
import { IFlashcard } from 'src/app/interfaces/IFlashcard';
import { DeckService } from 'src/app/services/deck.service';
import { TestDataServiceService } from 'src/app/services/test-data-service.service';

@Component({
  selector: 'app-open-test',
  templateUrl: './open-test.component.html',
  styleUrls: ['./open-test.component.css']
})
export class OpenTestComponent implements OnInit {
  deck: IDeck | undefined = {} as IDeck;
  deckId: string = "";
  private routeSub: Subscription = {} as Subscription;
  flashcards: IFlashcard[] | undefined = [];
  test: IFlashcardTest[] = [];
  question: IFlashcardTest = {} as IFlashcardTest;
  userAnswer: string = '';
  currentFlashcard: string | undefined = "";
  iterator: number = 0;
  progressBarValue: number = 0;

  result: IFlashcardTest[] = [];
  subscription: Subscription = {} as Subscription;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute,
    public router: Router,
    private testDataService: TestDataServiceService
  ) { }

  async ngOnInit(): Promise<void> {
    this.subscription = this.testDataService.currTest.subscribe(result => this.result = this.result);

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
        this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100
      });

    this.Shuffle();
  }

  Next() {
    this.question.flashcard = this.flashcards![this.iterator];
    this.question.userAnswer = this.userAnswer;
    this.test.push(this.question);

    console.log(this.test);

    ++this.iterator;
    if (this.iterator >= this.flashcards?.length!) {
      this.testDataService.sendTestResults(this.test);
      this.router.navigate(['decks', this.deckId, 'open-test', 'results']);
    }
    else {
      this.currentFlashcard = this.flashcards![this.iterator].question;
      this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100;
    }

    this.question = {} as IFlashcardTest;
    this.userAnswer = '';
  }

  Shuffle() {
    this.flashcards = this.flashcards?.sort(() => Math.random() - 0.5)
    this.iterator = 0;
    this.currentFlashcard = this.flashcards![this.iterator].question
    this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100
    //  console.log(this.flashcards)
  }

}
