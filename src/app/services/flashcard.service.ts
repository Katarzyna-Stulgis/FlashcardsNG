import { IFlashcard } from './../interfaces/IFlashcard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private url = "flashcards";

  constructor(private httpClient: HttpClient) { }

  public getFlashcard(flashcardId: string): Observable<IFlashcard> {
    return this.httpClient.get<IFlashcard>(`${environment.apiUrl}/${this.url}/${flashcardId}`);
  }

  public addFlashcard(folder: IFlashcard): Observable<IFlashcard> {
    return this.httpClient.post<IFlashcard>(`${environment.apiUrl}/${this.url}`, folder);
  }

  public editFlashcard(deck: IFlashcard): Observable<IFlashcard> {
    return this.httpClient.put<IFlashcard>(`${environment.apiUrl}/${this.url}/${deck.flashcardId}`, deck);
  }

  public deleteFlashcard(flashcardId: string): Observable<IFlashcard> {
    return this.httpClient.delete<IFlashcard>(`${environment.apiUrl}/${this.url}/${flashcardId}`);
  }
}
