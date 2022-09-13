import { AddDeckComponent } from './components/add-deck/add-deck.component';
import { FolderDetailsComponent } from './components/folder-details/folder-details.component';
import { FoldersComponent } from './components/folders/folders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'folders', component: FoldersComponent },
  { path: '', component: FoldersComponent },
  { path: 'folders/:id', component: FolderDetailsComponent},
  { path: 'decks/add-deck', component: AddDeckComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
