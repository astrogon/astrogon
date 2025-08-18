import { getEntry, getCollection, type CollectionKey } from "astro:content";
import type { GenericEntry } from "@/types";

export const getIndex = async (collection: CollectionKey): Promise<GenericEntry> => {
  const index = await getEntry(collection, "-index");
  return index;
}

export const getEntries = async (
  collection: CollectionKey,
  sortFunction?: ((array: any[]) => any[]),
  noIndex = true,
  noDrafts = true
): Promise<GenericEntry[]> => {
  let entries: GenericEntry[] = await getCollection(collection);
  entries = noIndex
    ? entries.filter((entry: GenericEntry) => !entry.id.match(/^-/))
    : entries;
  entries = noDrafts
    ? entries.filter((entry: GenericEntry) => 'draft' in entry.data && !entry.data.draft)
    : entries;
  entries = sortFunction ? sortFunction(entries) : entries;
  return entries;
};

// Fetch all pages in all specified collections, flattened into a single array
export const getEntriesBatch = async (
  collections: CollectionKey[],
  sortFunction?: ((array: any[]) => any[]),
  noIndex = true,
  noDrafts = true
): Promise<GenericEntry[]> => {
  const allCollections = await Promise.all(
    collections.map(async (collection) => {
      return await getEntries(collection, sortFunction, noIndex, noDrafts);
    })
  );
  return allCollections.flat();
};

// Fetch top-level folders within a collection
export const getGroups = async (
  collection: CollectionKey,
  sortFunction?: ((array: any[]) => any[])
): Promise<GenericEntry[]> => {
  let entries = await getEntries(collection, sortFunction, false);
  entries = entries.filter((entry: GenericEntry) => {
    const segments = entry.id.split("/");
    return segments.length === 2 && segments[1] == "-index";
  });
  return entries;
};

// Fetch entries within the specified collection and group
export const getEntriesInGroup = async (
  collection: CollectionKey,
  groupSlug: string,
  sortFunction?: ((array: any[]) => any[]),
): Promise<GenericEntry[]> => {
  let entries = await getEntries(collection, sortFunction);
  entries = entries.filter((data: any) => {
    const segments = data.id.split("/");
    return segments[0] === groupSlug && segments.length > 1 && segments[1] !== "-index";
  });
  return entries;
};
