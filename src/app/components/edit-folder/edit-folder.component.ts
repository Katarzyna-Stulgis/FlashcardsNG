import { FoldersComponent } from './../folders/folders.component';
import { Folder } from 'src/app/models/folder';
import { Component, OnInit, Inject, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderService } from 'src/app/services/folder.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {
  @Output() foldersUpdated = new EventEmitter<Folder[]>();
  folders: Folder[] = [];
 // @ViewChild(FoldersComponent) foldersComponent: FoldersComponent ={} as FoldersComponent;

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
       // this.foldersComponent.ngOnInit();
       //dodac czyszcenie input on lcikc
      this.dialogRef.close();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
