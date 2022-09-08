import { Component, OnInit } from '@angular/core';
import { Folder } from 'src/app/interfaces/Folder';
import { FolderService } from './../../services/folder.service';


@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  // @Input() folder?: Folder
  // @Output() foldersUpdated = new EventEmitter<Folder[]>();

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

  /*   addFolder(folder: Folder) {
      folder.folderId = "00000000-0000-0000-0000-000000000000"
      folder.userId = "e22e7101-058e-47cd-8d6f-66633d596fad"
      this.folderService
        .addFolder(folder)
        .subscribe((folders: Folder[]) => this.foldersUpdated.emit(folders));
    }
  
    editFolder(folder: Folder) {
      folder.userId = "e22e7101-058e-47cd-8d6f-66633d596fad"
      this.folderService
        .editFolder(folder)
        .subscribe((folders: Folder[]) => this.foldersUpdated.emit(folders));
    }
  
    deleteFolder(folder: Folder) {
      this.folderService
        .deleteFolder(folder)
        .subscribe((folders: Folder[]) => this.foldersUpdated.emit(folders));
    } */
}
