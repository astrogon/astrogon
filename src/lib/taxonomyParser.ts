import { getEntries } from "./contentParser";
import { slugify } from "./textConverter";
import type { CollectionKey } from "astro:content";

export const getTaxa = async (collection: CollectionKey, name: string) => {
  const entries = await getEntries(collection);
  // Ensure we always iterate arrays; treat missing taxonomy as empty
  const taxonomyPages = entries.map((entry: any) => {
    const val = entry?.data?.[name];
    return Array.isArray(val) ? val : [];
  });
  const taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const arr = taxonomyPages[i];
    for (let j = 0; j < arr.length; j++) {
      const v = arr[j];
      if (typeof v === "string" && v.trim().length) {
        taxonomies.push(slugify(v));
      }
    }
  }
  const taxonomy = [...new Set(taxonomies)];
  taxonomy.sort((a, b) => a.localeCompare(b)); // alphabetize
  return taxonomy;
};

export const getTaxaMultiset = async (collection: CollectionKey, name: string) => {
  const entries = await getEntries(collection);
  const taxonomyPages = entries.map((entry: any) => {
    const val = entry?.data?.[name];
    return Array.isArray(val) ? val : [];
  });
  const taxonomies: string[] = [];
  for (let i = 0; i < taxonomyPages.length; i++) {
    const arr = taxonomyPages[i];
    for (let j = 0; j < arr.length; j++) {
      const v = arr[j];
      if (typeof v === "string" && v.trim().length) {
        taxonomies.push(slugify(v));
      }
    }
  }
  return taxonomies;
};
