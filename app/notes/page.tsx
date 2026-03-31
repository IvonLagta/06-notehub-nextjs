import NotesClient from "./Notes.client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/react-query";
import { notesQueryOptions } from "@/lib/queries/notes";

export default async function NotesPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(notesQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
