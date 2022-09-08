import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/app/interfaces/Folder';
import { FolderService } from './../../services/folder.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  folders: Folder[] = [];

  constructor(private folderService: FolderService) { }

  ngOnInit(): void {
    this.getFolder();
  }

  getFolder() {
    this.folderService
      .getFolders()
      .subscribe((result: Folder[]) => this.folders = result);
  }
}
