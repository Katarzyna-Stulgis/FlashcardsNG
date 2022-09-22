import { ContentObserver } from '@angular/cdk/observers';
import { ILoginUser } from './../../interfaces/ILoginUser';
import { IRegisterUser } from './../../interfaces/IRegisterUser';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginUser: ILoginUser = {} as ILoginUser;
  registerUser: IRegisterUser = {} as IRegisterUser;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(user: IRegisterUser) {
    console.log(user)
    this.authService.register(user).subscribe();

  }

  login(user: ILoginUser) {
    console.log(user)
    this.authService.login(user).subscribe(
      (token: string) => {
        localStorage.setItem('authToken', token);
      }
    )
    console.log(localStorage.getItem('authToken'))
    console.log(this.authService.loggedIn());
  }

}