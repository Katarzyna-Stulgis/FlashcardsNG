import { IFlashcard } from './IFlashcard';
export interface IDeck {
    deckId: string;
    name: string;
    description: string;
    visibilityType: number;
    flashcards?: IFlashcard[];
    users: []
}