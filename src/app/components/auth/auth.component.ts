import { ILoginUser } from './../../interfaces/ILoginUser';
import { IRegisterUser } from './../../interfaces/IRegisterUser';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/classes/MyErrorStateMatcher';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginUser: ILoginUser = {} as ILoginUser;
  registerUser: IRegisterUser = {} as IRegisterUser;

  selectedIndex: number = 0;

  //errors
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  matcher = new MyErrorStateMatcher();

  constructor(
    private authService: AuthService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  register(user: IRegisterUser) {
    this.authService.register(user).subscribe(
      (data) => {
        this._snackBar.open("Pomyślnie zarejestrowano", "",
          {
            duration: 1500,
          });
        this.selectedIndex = 0;
      },
      (error: HttpErrorResponse) => {
        this._snackBar.open("Coś poszło nie tak, spróbuj ponownie", "",
          {
            duration: 1500,
          });
        this.selectedIndex = 1;
      });
  }

  login(user: ILoginUser) {
    this.authService.login(user).subscribe(
      (token: string) => {
        localStorage.setItem('authToken', token);
        this.router.navigate(['decks']);
      },
      (error) => {
        this._snackBar.open("Niprawidłowy e-mail lub hasło", "",
          {
            duration: 1500,
          });
      }
    )
  }
}
