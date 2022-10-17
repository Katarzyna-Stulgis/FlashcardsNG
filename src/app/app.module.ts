import { AuthGuard } from './services/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { AuthComponent } from './components/auth/auth.component';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './shared/material.module';
import { FoldersComponent } from './components/lists/folders/folders.component';
import { FolderComponent } from './components/lists/folders/folder/folder.component';
import { EditFolderComponent } from './components/edition/edit-folder/edit-folder.component';
import { FolderDetailsComponent } from './components/details/folder-details/folder-details.component';
import { DeleteFolderComponent } from './components/deletion/delete-folder/delete-folder.component';
import { AddDeckComponent } from './components/addition/add-deck/add-deck.component';
import { AddFlashcardComponent } from './components/addition/add-deck/add-flashcard/add-flashcard.component';
import { DecksComponent } from './components/lists/decks/decks.component';
import { DeckComponent } from './components/lists/decks/deck/deck.component';
import { DeckDetailsComponent } from './components/details/deck-details/deck-details.component';
import { DeckFlashcardComponent } from './components/details/deck-details/deck-flashcard/deck-flashcard.component';
import { EditFlashcardComponent } from './components/edition/edit-flashcard/edit-flashcard.component';
import { LearnFlashcardsComponent } from './components/learning/learn-flashcards/learn-flashcards.component';
import { OpenTestComponent } from './components/learning/open-test/open-test.component';
import { TestResultsComponent } from './components/learning/test-results/test-results.component';
import { TestAnswersComponent } from './components/learning/test-results/test-answers/test-answers.component';
import { ClosedTestComponent } from './components/learning/closed-test/closed-test.component';
import { EditDeckComponent } from './components/edition/edit-deck/edit-deck.component';
import { DeleteFlashcardComponent } from './components/deletion/delete-flashcard/delete-flashcard.component';
import { DeleteDeckComponent } from './components/deletion/delete-deck/delete-deck.component';
import { MainComponent } from './components/main/main.component';
import { EditDecksInFolderComponent } from './components/edition/edit-decks-in-folder/edit-decks-in-folder.component';
import { FolderDecksComponent } from './components/details/folder-details/folder-decks/folder-decks.component';
import { ShareDeckComponent } from './components/share/share-deck/share-deck.component';
import { ClipboardModule } from 'ngx-clipboard';
import { GetDeckToShareComponent } from './components/share/get-deck-to-share/get-deck-to-share.component';


@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    FolderComponent,
    EditFolderComponent,
    FolderDetailsComponent,
    DeleteFolderComponent,
    AddDeckComponent,
    AddFlashcardComponent,
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
    MainComponent,
    AuthComponent,
    EditDecksInFolderComponent,
    FolderDecksComponent,
    ShareDeckComponent,
    GetDeckToShareComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
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
