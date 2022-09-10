import { IDialogData } from './../../interfaces/IDialogData';
import { IFolder } from 'src/app/interfaces/IFolder';
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {
  @Output() foldersUpdated = new EventEmitter<IFolder[]>();
  folderTemp: IFolder = {} as IFolder;

  constructor(
    public dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private folderService: FolderService
  ) { }

  ngOnInit(): void {
    this.getFolder(this.data.folder.folderId);
  }

  SaveFolder() {
    switch (this.data.action) {
      case 'add':
        this.AddFolder()
        window.location.reload();
        break;
      case 'edit':
        this.EditFolder();
        break;
    }
    this.dialogRef.close();
  }

  CloseDialog(): void {
    switch (this.data.action) {
      case 'add':
        this.data.folder.name = '';
        this.data.folder.description = '';
        this.dialogRef.close();
        break;
      case 'edit':
        this.data.folder.name = this.folderTemp.name;
        this.data.folder.description = this.folderTemp.description;
        break;
    }
    this.dialogRef.close();
  }

  getFolder(folderId: string) {
    this.folderService
      .getFolder(folderId)
      .subscribe((result: IFolder) => this.folderTemp = result);
  }

  AddFolder() {
    if (this.data.folder.name != undefined) {
      this.data.folder.folderId = "00000000-0000-0000-0000-000000000000";
      this.data.folder.userId = "72eb5903-7dd5-4133-9f16-3f9fc7d84e87";
      this.folderService
        .addFolder(this.data.folder)
        .subscribe((folders: IFolder[]) => this.foldersUpdated.emit(folders));
      this.data.folder.name = '';
      this.data.folder.description = '';
    }
  }

  EditFolder() {
    this.folderService
      .editFolder(this.data.folder)
      .subscribe((folders: IFolder[]) => this.foldersUpdated.emit(folders));
  }
}
