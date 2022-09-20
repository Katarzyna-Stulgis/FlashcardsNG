import { IDeckFolder } from './IDeckFolder';
import { IDeckUser } from './IDeckUser';
import { IFlashcard } from './IFlashcard';

export interface IDeck {
    deckId: string;
    title: string;
    description: string;

    flashcardAmount: number;

    flashcards: IFlashcard[];
    deckFoldedrs: IDeckFolder[];
    deckUsers: IDeckUser[];
}