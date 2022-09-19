import { IFlashcardTest } from './../interfaces/IFlashcardTest';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestDataServiceService {

  result: IFlashcardTest[] =[];

  private testResultsSource = new BehaviorSubject<IFlashcardTest[]>(this.result);
  currTest = this.testResultsSource.asObservable();

  constructor() { }

  sendTestResults(testRes: IFlashcardTest[]){
    this.testResultsSource.next(testRes);
  }
}
