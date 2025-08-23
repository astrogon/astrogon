const similerItems = (currentItem: any, allItems: any, id: string) => {
  let categories: string[] = [];
  let tags: string[] = [];

  // set categories
  if (Array.isArray(currentItem?.data?.categories) && currentItem.data.categories.length > 0) {
    categories = currentItem.data.categories;
  }

  // set tags
  if (Array.isArray(currentItem?.data?.tags) && currentItem.data.tags.length > 0) {
    tags = currentItem.data.tags;
  }

  if (categories.length === 0 && tags.length === 0) {
    return [];
  }

  // filter by categories
  const filterByCategories = allItems.filter((item: any) => {
    const itemCats: string[] = Array.isArray(item?.data?.categories) ? item.data.categories : [];
    return categories.some((category) => itemCats.includes(category));
  });

  // filter by tags
  const filterByTags = allItems.filter((item: any) => {
    const itemTags: string[] = Array.isArray(item?.data?.tags) ? item.data.tags : [];
    return tags.some((tag) => itemTags.includes(tag));
  });

  // merged after filter
  const mergedItems = [...filterByCategories, ...filterByTags];

  // Remove self from list
  const filterByID = mergedItems.filter((item) => item.id !== id);

  // count instances of each item
  const itemCount = filterByID.reduce((accumulator: Record<string, number>, currentItem: any) => {
    accumulator[currentItem.id] = (accumulator[currentItem.id] || 0) + 1;
    return accumulator;
  }, {} as Record<string, number>);

  // sort items by number of instances
  const sortedItems = filterByID.sort((a: any, b: any) => itemCount[b.id] - itemCount[a.id]);

  // remove items with fewer than 2 instances
  const filteredItems = sortedItems.filter((item: any) => itemCount[item.id] > 1);

  // remove duplicates
  const uniqueItems = [...new Set(filteredItems.map((item: any) => item.id))]
    .map((id: string) => filteredItems.find((item: any) => item.id === id))
    .filter(Boolean);

  return uniqueItems;
};

export default similerItems;
