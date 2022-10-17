import { IDeck } from '../../../../interfaces/IDeck';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  @Input() deck: IDeck = {} as IDeck;

  constructor() { }

  ngOnInit(): void {
  }

}
