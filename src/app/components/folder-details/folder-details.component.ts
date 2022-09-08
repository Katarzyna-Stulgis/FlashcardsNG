import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.css']
})
export class FolderDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(history.state.folderId)
  }

}
