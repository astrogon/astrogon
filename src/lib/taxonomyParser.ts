import { getEntries } from "./contentParser";
import { slugify } from "./textConverter";
import type { CollectionKey } from "astro:content";
import type { GenericEntry } from "@/types";

export const getTaxa = async (collection: CollectionKey, name: string) => {
  const entries = await getEntries(collection);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const taxonomyPages = entries.map(
    (entry: GenericEntry) => (entry.data as any)[name]
  );
  const taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    for (let j = 0; j < categoryArray.length; j++) {
      taxonomies.push(slugify(categoryArray[j]));
    }
  }
  const taxonomy = [...new Set(taxonomies)];
  taxonomy.sort((a, b) => a.localeCompare(b)); // alphabetize
  return taxonomy;
};

export const getTaxaMultiset = async (
  collection: CollectionKey,
  name: string
) => {
  const entries = await getEntries(collection);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const taxonomyPages = entries.map(
    (entry: GenericEntry) => (entry.data as any)[name]
  );
  const taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const categoryArray = taxonomyPages[i];
    for (let j = 0; j < categoryArray.length; j++) {
      taxonomies.push(slugify(categoryArray[j]));
    }
  }
  return taxonomies;
};
