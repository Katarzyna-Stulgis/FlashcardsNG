import { NgModule } from '@angular/core';
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
import { EditDeckComponent } from './components/edit-deck/edit-deck.component';
import { FlashcardComponent } from './components/edit-deck/flashcard/flashcard.component';
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

@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    FolderComponent,
    EditFolderComponent,
    FolderDetailsComponent,
    DeleteFolderComponent,
    EditDeckComponent,
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
    ClosedTestComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
