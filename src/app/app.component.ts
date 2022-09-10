import { EditFolderComponent } from './components/edit-folder/edit-folder.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFolder } from 'src/app/interfaces/IFolder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FlashcardsNG';
  folder: IFolder = {} as IFolder;

  constructor(public dialog: MatDialog) { }

  openDialog(action: string): void {
    const dialogRef = this.dialog.open(EditFolderComponent, {
      width: 'auto',
      data: { folder: this.folder, action: action },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
