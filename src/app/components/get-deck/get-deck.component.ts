import { IDeckUser } from './../../interfaces/IDeckUser';
import { DeckUserService } from './../../services/deck-user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeck } from 'src/app/interfaces/IDeck';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-deck',
  templateUrl: './get-deck.component.html',
  styleUrls: ['./get-deck.component.css']
})
export class GetDeckComponent implements OnInit {
  deckId: string = "";
  deckUser: IDeckUser = {
    isEditable: false
  } as IDeckUser;

  constructor(
    public dialogRef: MatDialogRef<GetDeckComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeck,
    private deckUserService: DeckUserService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  Close() {
    this.dialogRef.close();
  }

  async Save() {
    if(this.deckUser.deckId!=""){
      this.deckUser.userId = this.authService.getToken().UserId;
      await this.deckUserService
          .addDeckUser(this.deckUser)
          .subscribe(data => {
            this.showSnackbar("Dodano zestaw");
            setTimeout(window.location.reload.bind(window.location), 500);
          });
    }
  }

  showSnackbar(message: string) {
    this._snackBar.open(message);
  }

}
