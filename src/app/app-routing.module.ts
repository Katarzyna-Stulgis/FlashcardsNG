import { Folder } from 'src/app/interfaces/Folder';
import { FolderDetailsComponent } from './components/folder-details/folder-details.component';
import { FoldersComponent } from './components/folders/folders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'folders', component: FoldersComponent },
  { path: '', component: FoldersComponent },
  { path: 'folders/:folderName', component: FolderDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
