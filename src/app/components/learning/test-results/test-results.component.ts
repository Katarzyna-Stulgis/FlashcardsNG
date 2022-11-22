import { TestDataServiceService } from './../../../services/test-data-service.service';
import { IFlashcardTest } from './../../../interfaces/IFlashcardTest';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  results: IFlashcardTest[] = [];
  subscription: Subscription = {} as Subscription;
  numberOfCorrectAnswers: number = 0;
  numberOfUncorrectAnswers: number = 0;
  percentageOfCorrectAnswers: number = 0;

  constructor(
    private testDataService: TestDataServiceService
  ) { }

  ngOnInit(): void {
    this.subscription = this.testDataService.currTest.subscribe(result => {
      this.results = result
    })

    this.countResults();
  }

  countResults() {
    console.log(this.results);
    this.results.forEach(result => {
      if(result.userAnswer == undefined){
        result.userAnswer = "";
      }
      if (result.userAnswer.toLowerCase() == result.flashcard.answer.toLowerCase()) {
        this.numberOfCorrectAnswers++;
      }
      else {
        this.numberOfUncorrectAnswers++;
      }
    });

    this.percentageOfCorrectAnswers = Math.round((this.results.length > 0) ? (this.numberOfCorrectAnswers / this.results.length) * 100 : 0);
  }
  
}
