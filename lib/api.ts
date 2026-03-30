import axios from "axios";
import type { CreateNoteValues, Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const baseUrl = "https://notehub-public.goit.study/api";
const noteOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
};
axios.defaults.baseURL = baseUrl;

export async function fetchNotes(
  search?: string,
  page?: number,
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>("/notes", {
    params: { search, page, perPage: 12 },
    ...noteOptions,
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`, {
    ...noteOptions,
  });
  return response.data;
}

export async function createNote(note: CreateNoteValues): Promise<Note> {
  const response = await axios.post<Note>("/notes", note, noteOptions);
  return response.data;
}

export async function deleteNote(noteId: string): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${noteId}`, noteOptions);
  return response.data;
}
