import { ILoginUser } from './../interfaces/ILoginUser';
import { IRegisterUser } from './../interfaces/IRegisterUser';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "accounts";

  constructor(private httpClient: HttpClient) { }

  public register(user: IRegisterUser): Observable<IRegisterUser> {
    return this.httpClient.post<IRegisterUser>(`${environment.apiUrl}/${this.url}/register`, user);
  }

  public login(user: ILoginUser): Observable<string> {
    return this.httpClient.post(`${environment.apiUrl}/${this.url}/login`, user, {
      responseType: 'text',
    });
  }

  public loggedIn() {
    return !!localStorage.getItem('authToken');
  }

  public logoutUser() {
    localStorage.removeItem('authToken');
  }

  public getToken() {
    return localStorage.getItem('authToken');
  }

}
