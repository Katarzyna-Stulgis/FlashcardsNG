import { AuthService } from 'src/app/services/auth.service';
import { IFolder } from 'src/app/interfaces/IFolder';
import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FolderService } from 'src/app/services/folder.service';
import { IDialogFolderData } from 'src/app/interfaces/IDialogFolderData';

@Component({
  selector: 'app-edit-folder',
  templateUrl: './edit-folder.component.html',
  styleUrls: ['./edit-folder.component.css']
})
export class EditFolderComponent implements OnInit {
  @Output() foldersUpdated = new EventEmitter<IFolder>();
  folderTemp: IFolder = {} as IFolder;
  actionName: string = "";

  constructor(
    public dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogFolderData,
    private folderService: FolderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    switch (this.data.action) {
      case 'add':
        this.actionName = 'Nowy Folder';
        break;
      case 'edit':
        this.getFolder(this.data.folder.folderId);
        this.actionName = 'Edycja Folderu'
        break;
    }
  }

  SaveFolder() {
    switch (this.data.action) {
      case 'add':
        this.AddFolder();
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
      this.data.folder.userId = this.authService.getToken().UserId;
      this.folderService
        .addFolder(this.data.folder)
        .subscribe((folders: IFolder) => 
        { 
          this.foldersUpdated.emit(folders); 
          this.data.folder.name = '';
          this.data.folder.description = '';
          window.location.reload();
        });
    }
  }

  EditFolder() {
    this.folderService
      .editFolder(this.data.folder)
      .subscribe((folder: IFolder) => this.foldersUpdated.emit(folder));
  }
}
