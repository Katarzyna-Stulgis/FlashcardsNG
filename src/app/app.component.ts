import { GetDeckToShareComponent } from './components/share/get-deck-to-share/get-deck-to-share.component';
import { AuthService } from './services/auth.service';
import { EditFolderComponent } from './components/edition/edit-folder/edit-folder.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IFolder } from 'src/app/interfaces/IFolder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FlashcardsNG';
  userIsLoggedIn: boolean = false;
  folder: IFolder = {} as IFolder;
  userName: string = "";

  constructor(public dialog: MatDialog,
    private authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(
      logged => this.userIsLoggedIn = logged);

    if (this.userIsLoggedIn) {
      this.userName = this.authService.getToken().Name;
    }
  }

  openDialog(action: string): void {
    if (action == 'add') {
      this.dialog.open(EditFolderComponent, {
        width: 'auto',
        data: { folder: this.folder, action: action },
      });
    }
    else if(action == 'get'){
      this.dialog.open(GetDeckToShareComponent, {
        width: 'auto',
        data: { },
      });
    }
  }

  LogOut() {
    this.authService.logoutUser();
    this.router.navigate(['/'])
  }
}
