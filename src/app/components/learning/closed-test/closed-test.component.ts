import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { IDeck } from 'src/app/interfaces/IDeck';
import { IFlashcard } from 'src/app/interfaces/IFlashcard';
import { IFlashcardTest } from 'src/app/interfaces/IFlashcardTest';
import { DeckService } from 'src/app/services/deck.service';
import { TestDataServiceService } from 'src/app/services/test-data-service.service';

@Component({
  selector: 'app-closed-test',
  templateUrl: './closed-test.component.html',
  styleUrls: ['./closed-test.component.css']
})
export class ClosedTestComponent implements OnInit {
  deck: IDeck | undefined = {} as IDeck;
  deckId: string = "";
  private routeSub: Subscription = {} as Subscription;
  flashcards: IFlashcard[] | undefined = [];
  possibleAnswers: IFlashcard[] | undefined = [];
  test: IFlashcardTest[] = [];
  question: IFlashcardTest = {} as IFlashcardTest;
  currentFlashcard: string | undefined = "";
  iterator: number = 0;
  progressBarValue: number = 0;

  questionAnswers: IFlashcard[] = [];

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

    await this.deckService
      .getDeck(this.deckId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.deck = data;
        this.flashcards = data?.flashcards;
        this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100;
      });


    this.Shuffle();

    this.currentFlashcard = this.flashcards![this.iterator].question;
    this.getAnswers();
  }

  getAnswers() {
    this.possibleAnswers = this.flashcards?.filter(x => x.question !== this.currentFlashcard);
    this.possibleAnswers = this.possibleAnswers?.sort(() => Math.random() - 0.5);

    this.possibleAnswers = this.possibleAnswers?.splice(0, 3);
    this.possibleAnswers?.push(this.flashcards![this.iterator]);
    this.possibleAnswers = this.possibleAnswers?.sort(() => Math.random() - 0.5);
  }

  Next() {
    this.question.flashcard = this.flashcards![this.iterator];
    this.test.push(this.question);

    ++this.iterator;
    if (this.iterator >= this.flashcards?.length!) {
      this.testDataService.sendTestResults(this.test);
      this.router.navigate(['decks', this.deckId, 'closed-test', 'results']);
    }
    else {
      this.currentFlashcard = this.flashcards![this.iterator].question;
      this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100;
    }

    this.question = {} as IFlashcardTest;
    this.getAnswers();
  }

  Shuffle() {
    this.flashcards = this.flashcards?.sort(() => Math.random() - 0.5);
    this.iterator = 0;
    this.currentFlashcard = this.flashcards![this.iterator].question;
    this.progressBarValue = ((this.iterator + 1) / this.flashcards?.length!) * 100;
  }

  ClickedAnswer(useranswer: string) {
    this.question.userAnswer = useranswer;
  }
}
