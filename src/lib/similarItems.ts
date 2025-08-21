import type { GenericEntry } from "@/types";

const similerItems = (
  currentItem: GenericEntry,
  allItems: GenericEntry[],
  id: string
) => {
  let categories: string[] = [];
  let tags: string[] = [];

  // set categories
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((currentItem.data as any)?.categories?.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    categories = (currentItem.data as any).categories;
  }

  // set tags
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((currentItem.data as any)?.tags?.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tags = (currentItem.data as any).tags;
  }

  // filter by categories
  const filterByCategories = allItems.filter((item: GenericEntry) =>
    categories.find((category) =>
      (item.data as { categories?: string[] }).categories?.includes(category)
    )
  );

  // filter by tags
  const filterByTags = allItems.filter((item: GenericEntry) =>
    tags.find((tag) => (item.data as { tags?: string[] }).tags?.includes(tag))
  );

  // merged after filter
  const mergedItems = [...filterByCategories, ...filterByTags];

  // Remove self from list
  const filterByID = mergedItems.filter((item) => item.id !== id);

  // count instances of each item
  const itemCount = filterByID.reduce(
    (accumulator: Record<string, number>, currentItem: GenericEntry) => {
      accumulator[currentItem.id] = (accumulator[currentItem.id] || 0) + 1;
      return accumulator;
    },
    {}
  );

  // sort items by number of instances
  const sortedItems = filterByID.sort(
    (a: GenericEntry, b: GenericEntry) => itemCount[b.id] - itemCount[a.id]
  );

  // remove items with fewer than 2 instances
  const filteredItems = sortedItems.filter(
    (item: GenericEntry) => itemCount[item.id] > 1
  );

  // remove duplicates
  const uniqueItems = [
    ...new Set(filteredItems.map((item: GenericEntry) => item.id)),
  ].map((id: string) => {
    return filteredItems.find((item: GenericEntry) => item.id === id);
  });

  return uniqueItems;
};

export default similerItems;
