import { IFolder } from '../../interfaces/IFolder';
import { Component, OnInit } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { MatDialog } from '@angular/material/dialog';
import { EditFolderComponent } from '../edit-folder/edit-folder.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DeleteFolderComponent } from '../delete-folder/delete-folder.component';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.css']
})
export class FolderDetailsComponent implements OnInit {
  folder: IFolder = {} as IFolder;
  private routeSub: Subscription = {} as Subscription;
  private folderId: string = "";

  constructor(
    private folderService: FolderService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.folderId = params['id']
    });

    this.getFolder();
  }

  getFolder() {
    this.folderService
      .getFolder(this.folderId)
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

  deleteFolder() {
    const dialogRef = this.dialog.open(DeleteFolderComponent, {
      width: 'auto',
      data: { folder: this.folder },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
