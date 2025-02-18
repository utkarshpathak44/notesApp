export interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface FoldersResponse {
  folders: Folder[];
}

export interface NoteDataInterface {
    folderId: string;
    title: string;
    content: string;
    isFavorite: boolean;
    isArchived: boolean;
  }