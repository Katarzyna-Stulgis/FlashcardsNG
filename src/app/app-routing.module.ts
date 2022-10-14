import { AuthGuard } from './services/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
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
  { path: '', component: MainComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'folders', component: FoldersComponent, canActivate: [AuthGuard] },
  { path: 'folders/:id', component: FolderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'folders/add-deck-to-folder/:id', component: AddDeckComponent, canActivate: [AuthGuard] },
  { path: 'decks', component: DecksComponent, canActivate: [AuthGuard] },
  { path: 'decks/add-deck', component: AddDeckComponent, canActivate: [AuthGuard] },
  { path: 'decks/:id', component: DeckDetailsComponent, canActivate: [AuthGuard] },
  { path: 'decks/:id/start', component: LearnFlashcardsComponent, canActivate: [AuthGuard] },
  { path: 'decks/:id/open-test', component: OpenTestComponent, canActivate: [AuthGuard] },
  { path: 'decks/:id/closed-test', component: ClosedTestComponent, canActivate: [AuthGuard] },
  { path: 'decks/:id/edit-deck', component: AddDeckComponent, canActivate: [AuthGuard] },
  { path: 'decks/:id/open-test/results', component: TestResultsComponent, canActivate: [AuthGuard] },
  { path: 'decks/:id/closed-test/results', component: TestResultsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
