import { IFolder } from '../../interfaces/IFolder';
import { Component, OnInit } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFolderComponent } from '../edit-folder/edit-folder.component';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.css']
})
export class FolderDetailsComponent implements OnInit {
  folder: IFolder = {} as IFolder;

  constructor(
    private folderService: FolderService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getFolder(history.state.folderId);
    console.log("history state: " + history.state.folderId);
    console.log({ folder: this.folder });
  }

  getFolder(folderId: string) {
    this.folderService
      .getFolder(folderId)
      .subscribe((result: IFolder) => this.folder = result);
  }

  editFolder(action: string): void {
    const dialogRef = this.dialog.open(EditFolderComponent, {
      width: 'auto',
      data: { folder: this.folder, action: action },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteFolder() { }

}
