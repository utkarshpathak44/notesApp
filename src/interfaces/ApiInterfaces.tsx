export interface Folder {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface FoldersResponseInterface {
  folders: Folder[];
  length:number|undefined
}

export interface noteResponseData {
  notes: NoteInterface[];
  total:number
}

export interface RecentsResponseData {
  recentNotes: NoteInterface[];
}

export interface NoteDataInterface {
  folderId: string|undefined;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
}


export interface NoteInterface {
  id: string;
  folderId: string;
  title: string;
  content: string
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  preview: string;
  folder: Folder;
}

export interface NotesResponse {
  notes: NoteInterface[];
}


export interface FileAttributesDropDownProps {
  noteId: string;
  noteData: NoteDataInterface;
  sendPatchRequest:() => Promise<void>
  sendDeleteRequest:() => Promise<void>
  setNoteData: React.Dispatch<React.SetStateAction<NoteDataInterface>>;
  setIsDeleted: (d:boolean) => void;
}