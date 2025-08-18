import { slugify } from "@lib/textConverter";

const taxonomyFilter = (posts: any[], name: string, key: string) =>
  posts.filter((post) =>
    post.data[name].map((name: string) => slugify(name)).includes(key),
  );

export default taxonomyFilter;
