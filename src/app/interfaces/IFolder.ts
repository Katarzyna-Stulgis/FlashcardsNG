import { IDeck } from './IDeck';
export interface IFolder {
    folderId: string;
    name: string;
    description: string;
    decks?: IDeck[];
    userId: string;
}