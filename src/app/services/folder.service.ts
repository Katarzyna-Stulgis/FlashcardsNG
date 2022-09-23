import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFolder } from 'src/app/interfaces/IFolder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private url = "folders";

  constructor(private httpClient: HttpClient) { }

  public getFolders(userId: string): Observable<IFolder[]> {
    let params = new HttpParams().set('userId', userId);
    return this.httpClient.get<IFolder[]>(`${environment.apiUrl}/${this.url}`, { params: params });
  }

  public getFolder(folderId: string): Observable<IFolder> {
    return this.httpClient.get<IFolder>(`${environment.apiUrl}/${this.url}/${folderId}`);
  }

  public addFolder(folder: IFolder): Observable<IFolder> {
    return this.httpClient.post<IFolder>(`${environment.apiUrl}/${this.url}`, folder);
  }

  public editFolder(folder: IFolder): Observable<IFolder> {
    return this.httpClient.put<IFolder>(`${environment.apiUrl}/${this.url}/${folder.folderId}`, folder);
  }

  public deleteFolder(folderId: string): Observable<IFolder> {
    return this.httpClient.delete<IFolder>(`${environment.apiUrl}/${this.url}/${folderId}`);
  }
}
