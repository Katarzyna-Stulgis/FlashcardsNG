import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDeck } from '../interfaces/IDeck';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private url = "decks";

  constructor(private httpClient: HttpClient) { }

  public getDecks(): Observable<IDeck[]> {
    return this.httpClient.get<IDeck[]>(`${environment.apiUrl}/${this.url}`);
  }

  public getDeck(deckId: string): Observable<IDeck> {
    return this.httpClient.get<IDeck>(`${environment.apiUrl}/${this.url}/${deckId}`);
  }

  public addDeck(folder: IDeck): Observable<IDeck> {
    return this.httpClient.post<IDeck>(`${environment.apiUrl}/${this.url}`, folder);
  }

  public editDeck(deck: IDeck): Observable<IDeck> {
    return this.httpClient.put<IDeck>(`${environment.apiUrl}/${this.url}/${deck.deckId}`, deck);
  }

  public deleteDeck(folderId: string): Observable<IDeck> {
    return this.httpClient.delete<IDeck>(`${environment.apiUrl}/${this.url}/${folderId}`);
  }
}
