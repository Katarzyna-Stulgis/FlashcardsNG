import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closed-test',
  templateUrl: './closed-test.component.html',
  styleUrls: ['./closed-test.component.css']
})
export class ClosedTestComponent implements OnInit {

  progressBarValue: number = 0;
  currentFlashcard: string | undefined = "";
  userAnswer: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  Next() { }

}
