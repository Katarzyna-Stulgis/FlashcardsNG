import { Folder } from 'src/app/interfaces/Folder';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {
  @Output() foldersUpdated = new EventEmitter<Folder[]>();
  folders: Folder[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public folder: Folder,
    private folderService: FolderService
  ) { }

  ngOnInit(): void {
    this.folderService
      .getFolders()
      .subscribe((result: Folder[]) => this.folders = result);
  }

  AddFolder() {
    console.log(this.folder.name);
    if (this.folder.name != undefined) {
      console.log(this.folders);
      console.log(this.folder);
      this.folder.folderId = "00000000-0000-0000-0000-000000000000";
      this.folder.userId = "e22e7101-058e-47cd-8d6f-66633d596fad";
      this.folderService
        .addFolder(this.folder)
        .subscribe((folders: Folder[]) => this.foldersUpdated.emit(folders));
      this.folder.name = '';
      this.folder.description = '';
      this.dialogRef.close();
    }
  }
  CloseDialog(): void {
    this.folder.name = '';
    this.folder.description = '';
    this.dialogRef.close();
  }

}
