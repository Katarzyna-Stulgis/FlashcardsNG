import { Component } from '@angular/core';
import { Folder } from './models/folder';
import { FolderService } from './services/folder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FlashcardsNG';
/*   folders: Folder[] = [];
  folderToEdit?: Folder;

  constructor(private folderService: FolderService) { }

  ngOnInit(): void {
    this.folderService
      .getFolders()
      .subscribe((result: Folder[]) => this.folders = result);
  }

  updateFolderList(folders: Folder[]) {
    this.folders = folders
  }

  initNewFolder() {
    this.folderToEdit = new Folder();
  }

  editFolder(folder: Folder) {
    this.folderToEdit = folder;
  } */
}
