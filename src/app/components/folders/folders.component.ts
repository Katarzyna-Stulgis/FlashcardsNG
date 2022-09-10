import { Component, OnInit } from '@angular/core';
import { IFolder } from 'src/app/interfaces/IFolder';
import { FolderService } from './../../services/folder.service';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {

  folders: IFolder[] = [];

  constructor(private folderService: FolderService) { }

  ngOnInit(): void {
    this.getFolders();
  }

  getFolders() {
    this.folderService
      .getFolders()
      .subscribe((result: IFolder[]) => this.folders = result);
  }
}
