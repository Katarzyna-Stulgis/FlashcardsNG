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
import { AddDeckComponent } from './components/add-deck/add-deck.component';
import { AddFlashcardComponent } from './components/add-deck/add-flashcard/add-flashcard.component';

@NgModule({
  declarations: [
    AppComponent,
    FoldersComponent,
    FolderComponent,
    EditFolderComponent,
    FolderDetailsComponent,
    DeleteFolderComponent,
    AddDeckComponent,
    AddFlashcardComponent
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
