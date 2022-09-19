import { ClosedTestComponent } from './components/learning/closed-test/closed-test.component';
import { TestResultsComponent } from './components/learning/test-results/test-results.component';
import { OpenTestComponent } from './components/learning/open-test/open-test.component';
import { LearnFlashcardsComponent } from './components/learning/learn-flashcards/learn-flashcards.component';
import { DeckDetailsComponent } from './components/deck-details/deck-details.component';
import { DecksComponent } from './components/decks/decks.component';
import { AddDeckComponent } from './components/add-deck/add-deck.component';
import { FolderDetailsComponent } from './components/folder-details/folder-details.component';
import { FoldersComponent } from './components/folders/folders.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: FoldersComponent },
  { path: 'folders', component: FoldersComponent },
  { path: 'folders/:id', component: FolderDetailsComponent },
  { path: 'decks', component: DecksComponent },
  { path: 'decks/add-deck', component: AddDeckComponent },
  { path: 'decks/:id', component: DeckDetailsComponent },
  { path: 'decks/:id/start', component: LearnFlashcardsComponent },
  { path: 'decks/:id/open-test', component: OpenTestComponent },
  { path: 'decks/:id/closed-test', component: ClosedTestComponent },
  { path: 'decks/:id/open-test/results', component: TestResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
