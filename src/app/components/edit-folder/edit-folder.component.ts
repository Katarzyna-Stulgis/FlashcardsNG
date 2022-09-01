import { FolderService } from './../../services/folder.service';
import { Folder } from './../../models/folder';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {
  @Input() folder?: Folder
  @Output() foldersUpdated = new EventEmitter<Folder[]>();

  constructor(private folderService: FolderService) { }

  ngOnInit(): void {
  }
  addFolder(folder: Folder) {
    this.folderService
      .addFolder(folder)
      .subscribe((folders: Folder[]) => this.foldersUpdated.emit(folders));
  }
  editFolder(folder: Folder) {
    this.folderService
      .editFolder(folder)
      .subscribe((folders: Folder[]) => this.foldersUpdated.emit(folders));
  }
  deleteFolder(folder: Folder) {
    this.folderService
      .deleteFolder(folder)
      .subscribe((folders: Folder[]) => this.foldersUpdated.emit(folders));

  }

}
