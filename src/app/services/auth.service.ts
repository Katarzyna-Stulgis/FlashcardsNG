import { ILoginUser } from './../interfaces/ILoginUser';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRegisterUser } from '../interfaces/IRegisterUser';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "accounts";
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public register(user: IRegisterUser): Observable<IRegisterUser> {
    return this.httpClient.post<IRegisterUser>(`${environment.apiUrl}/${this.url}/register`, user);
  }

  public login(user: ILoginUser): Observable<string> {
    var x = this.httpClient.post(`${environment.apiUrl}/${this.url}/login`, user, {
      responseType: 'text',
    });
    this.loggedIn.next(true);
    return x;
  }

  public UserIsLoggedIn() {
    var token = localStorage.getItem('authToken');
    if (token != undefined) {
      this.loggedIn.next(true);
    }
  }

  public logoutUser() {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }

  public getToken() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('authToken') as string;
    const decodedToken = helper.decodeToken(token);
    return decodedToken;
  }
}