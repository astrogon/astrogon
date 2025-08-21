import { slugify } from "@lib/textConverter";
import type { SearchableEntry } from "@/types";

const taxonomyFilter = (posts: SearchableEntry[], name: string, key: string) =>
  posts.filter((post) =>
    post.data[name].map((name: string) => slugify(name)).includes(key),
  );

export default taxonomyFilter;
