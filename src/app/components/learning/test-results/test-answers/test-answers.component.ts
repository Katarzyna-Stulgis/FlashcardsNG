import { IFlashcardTest } from './../../../../interfaces/IFlashcardTest';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-answers',
  templateUrl: './test-answers.component.html',
  styleUrls: ['./test-answers.component.css']
})
export class TestAnswersComponent implements OnInit {
  @Input() result: IFlashcardTest = {} as IFlashcardTest;
  answerIsCorrect: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.answerIsCorrect = (this.result.userAnswer.toLocaleLowerCase() == this.result.flashcard.answer.toLowerCase()) ? true : false;
  }

}
