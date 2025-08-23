import { slugify } from "@lib/textConverter";

const taxonomyFilter = (posts: any[], name: string, key: string) =>
  posts.filter((post) => {
    const vals = Array.isArray(post?.data?.[name]) ? post.data[name] : [];
    return vals.map((n: string) => slugify(n)).includes(key);
  });

export default taxonomyFilter;
