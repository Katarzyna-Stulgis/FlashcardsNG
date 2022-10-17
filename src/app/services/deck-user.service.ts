import { IDeckUser } from './../interfaces/IDeckUser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeckUserService {
  private url = "deck-users"

  constructor(private httpClient: HttpClient) { }

  public getDeckUser(userId: string, deckId: string): Observable<IDeckUser> {
    let params = new HttpParams()
      .set('userId', userId)
      .set('deckId', deckId)
    return this.httpClient.get<IDeckUser>(`${environment.apiUrl}/${this.url}/${userId}`, { params: params });
  }

  public getDeckUsers(userId: string, isEditable: boolean): Observable<IDeckUser[]> {
    let params = new HttpParams()
      .set('userId', userId)
      .set('isEditable', isEditable)
    return this.httpClient.get<IDeckUser[]>(`${environment.apiUrl}/${this.url}`, { params: params });
  }

  public addDeckUser(deckUser: IDeckUser): Observable<IDeckUser> {
    return this.httpClient.post<IDeckUser>(`${environment.apiUrl}/${this.url}`, deckUser)
  }

  public deleteListElement(deckUser: IDeckUser): Observable<IDeckUser> {
    return this.httpClient.delete<IDeckUser>(`${environment.apiUrl}/${this.url}`, { body: deckUser })
  }
}
