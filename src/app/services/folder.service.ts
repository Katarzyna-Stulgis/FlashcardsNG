import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Folder } from '../models/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private url = "folders";

  constructor(private httpClient: HttpClient) { }

  public getFolders(): Observable<Folder[]> {
    return this.httpClient.get<Folder[]>(`${environment.apiUrl}/${this.url}`);
  }

  public addFolder(folder:Folder): Observable<Folder[]> {
    return this.httpClient.post<Folder[]>(`${environment.apiUrl}/${this.url}`,folder);
  }

  public editFolder(folder:Folder): Observable<Folder[]> {
    return this.httpClient.put<Folder[]>(`${environment.apiUrl}/${this.url}/${folder.folderId}`,folder);
  }

  public deleteFolder(folder:Folder): Observable<Folder[]> {
    return this.httpClient.delete<Folder[]>(`${environment.apiUrl}/${this.url}/${folder.folderId}`);
  }
}
