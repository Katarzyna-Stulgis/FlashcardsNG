import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IDialogData } from 'src/app/interfaces/IDialogData';
import { IFolder } from 'src/app/interfaces/IFolder';
import { FolderService } from 'src/app/services/folder.service';
import { EditFolderComponent } from '../edit-folder/edit-folder.component';

@Component({
  selector: 'app-delete-folder',
  templateUrl: './delete-folder.component.html',
  styleUrls: ['./delete-folder.component.css']
})
export class DeleteFolderComponent implements OnInit {
  folder: IFolder = {} as IFolder;

  constructor(
    public dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData,
    private folderService: FolderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  DeleteFolder() {
    this.folderService
      .deleteFolder(this.data.folder.folderId)
      .subscribe(((result: IFolder) => this.folder = result));
  }

   Delete() {
    this.DeleteFolder()
    this.dialogRef.close();
    this.router.navigate(['/folders']);
  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
