import { Component, Input, OnInit } from '@angular/core';
import { IDeck } from 'src/app/interfaces/IDeck';

@Component({
  selector: 'app-folder-decks',
  templateUrl: './folder-decks.component.html',
  styleUrls: ['./folder-decks.component.css']
})
export class FolderDecksComponent implements OnInit {
  @Input() deck: IDeck = {} as IDeck;

  constructor() { }

  ngOnInit(): void {
  }

}
