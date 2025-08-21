import { slugify } from "@lib/textConverter";
import type { SearchableEntry } from "@/types";

const taxonomyFilter = (posts: SearchableEntry[], name: string, key: string) =>
  posts.filter((post) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (post.data as any)[name].map((name: string) => slugify(name)).includes(key)
  );

export default taxonomyFilter;
