import { AuthGuard } from './services/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './components/auth/auth.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { FoldersComponent } from './components/folders/folders.component';
import { FolderComponent } from './components/folders/folder/folder.component';
import { EditFolderComponent } from './components/edit-folder/edit-folder.component';
import { FolderDetailsComponent } from './components/folder-details/folder-details.component';
import { DeleteFolderComponent } from './components/delete-folder/delete-folder.component';
import { AddDeckComponent } from './components/add-deck/add-deck.component';
import { FlashcardComponent } from './components/add-deck/flashcard/flashcard.component';
import { DecksComponent } from './components/decks/decks.component';
import { DeckComponent } from './components/decks/deck/deck.component';
import { DeckDetailsComponent } from './components/deck-details/deck-details.component';
import { DeckFlashcardComponent } from './components/deck-details/deck-flashcard/deck-flashcard.component';
import { EditFlashcardComponent } from './components/edit-flashcard/edit-flashcard.component';
import { LearnFlashcardsComponent } from './components/learning/learn-flashcards/learn-flashcards.component';
import { OpenTestComponent } from './components/learning/open-test/open-test.component';
import { TestResultsComponent } from './components/learning/test-results/test-results.component';
import { TestAnswersComponent } from './components/learning/test-results/test-answers/test-answers.component';
import { ClosedTestComponent } from './components/learning/closed-test/closed-test.component';
import { EditDeckComponent } from './components/edit-deck/edit-deck.component';
import { DeleteFlashcardComponent } from './components/delete-flashcard/delete-flashcard.component';
import { DeleteDeckComponent } from './components/delete-deck/delete-deck.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { AddDeckToFolderComponent } from './components/add-deck-to-folder/add-deck-to-folder.component';
import { ExistingDeckComponent } from './components/add-deck-to-folder/existing-deck/existing-deck.component';
import { FolderDecksComponent } from './components/folder-details/folder-decks/folder-decks.component';
import { RemoveDeckFromFolderComponent } from './components/remove-deck-from-folder/remove-deck-from-folder.component';
import { DeckToRemoveComponent } from './components/remove-deck-from-folder/deck-to-remove/deck-to-remove.component';


@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    FolderComponent,
    EditFolderComponent,
    FolderDetailsComponent,
    DeleteFolderComponent,
    AddDeckComponent,
    FlashcardComponent,
    EditFlashcardComponent,
    DecksComponent,
    DeckComponent,
    DeckDetailsComponent,
    DeckFlashcardComponent,
    EditFlashcardComponent,
    LearnFlashcardsComponent,
    OpenTestComponent,
    TestResultsComponent,
    TestAnswersComponent,
    ClosedTestComponent,
    EditDeckComponent,
    DeleteFlashcardComponent,
    DeleteDeckComponent,
    MainComponentComponent,
    AuthComponent,
    AddDeckToFolderComponent,
    ExistingDeckComponent,
    FolderDecksComponent,
    RemoveDeckFromFolderComponent,
    DeckToRemoveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MaterialModule,
    FormsModule
  ],
  providers: [AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (service: AuthService) => function () { return service.UserIsLoggedIn(); },
      deps: [AuthService],
      multi: true
    },
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
