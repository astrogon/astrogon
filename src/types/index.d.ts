import type { CollectionEntry, CollectionKey } from "astro:content";
import type { MarkdownHeading } from "astro";

export type GenericEntry = CollectionEntry<CollectionKey>;

export type AboutEntry = CollectionEntry<"about">;
export type BlogEntry = CollectionEntry<"blog">;
export type DrinksEntry = CollectionEntry<"drinks">;
export type HomeEntry = CollectionEntry<"home">;
export type FoodEntry = CollectionEntry<"food">;
export type TermsEntry = CollectionEntry<"terms">;

export type SearchableEntry =
  | AboutEntry
  | BlogEntry
  | DrinksEntry
  | FoodEntry
  | TermsEntry;

export type EntryReference = {
  id: string;
  collection: string;
};

// Define heading hierarchy so that we can generate ToC
export interface HeadingHierarchy extends MarkdownHeading {
  subheadings: HeadingHierarchy[];
}

export type MenuItem = {
  title?: string;
  id: string;
  children: MenuItem[];
};

// Define the type for menu items to created nested object
export type MenuItemWithDraft = {
  title?: string;
  id: string;
  draft: boolean;
  children: MenuItemWithDraft[];
};

// Define the props for the SideNavMenu component
export type SideNavMenuProps = {
  items: MenuItemWithDraft[];
  level: number;
};
