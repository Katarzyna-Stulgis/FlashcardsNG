import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IDialogFolderData } from 'src/app/interfaces/IDialogFolderData';
import { IFolder } from 'src/app/interfaces/IFolder';
import { FolderService } from 'src/app/services/folder.service';
import { EditFolderComponent } from '../../edition/edit-folder/edit-folder.component';

@Component({
  selector: 'app-delete-folder',
  templateUrl: './delete-folder.component.html',
  styleUrls: ['./delete-folder.component.css']
})
export class DeleteFolderComponent implements OnInit {
  folder: IFolder = {} as IFolder;

  constructor(
    public dialogRef: MatDialogRef<EditFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogFolderData,
    private folderService: FolderService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  Delete() {
    this.folderService
      .deleteFolder(this.data.folder.folderId)
      .pipe(take(1))
      .toPromise()
      .then(data => {
        this.dialogRef.close();
        this.router.navigate(['/folders']);
      })

  }

  CloseDialog(): void {
    this.dialogRef.close();
  }

}
