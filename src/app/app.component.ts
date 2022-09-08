import { EditFolderComponent } from './components/edit-folder/edit-folder.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Folder } from 'src/app/interfaces/Folder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FlashcardsNG';
  folder: Folder = {} as Folder;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(EditFolderComponent, {
      width: 'auto',
      data: this.folder,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}
