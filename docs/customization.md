# Customization Guide

## Content Collections

### Stock Content

The written content in the template's collections was AI generated. The images are Creative Commons licenced with a paint filter applied to them. The goal was to have disposable content that better demonstrates the form of the collections than "Lorem ipsum". In case you're unsure, review my [Terms of Use](https://astrogon.reednel.com/terms/) for the policy on the use and redistribution of this content.

### The Mechanics

The idea of a **Content Collection** is one of Astro's most central features. A content collection is a structured way to store and retrieve content for your site. Each collection consists of one or multiple **Entries**, which, in this site, are stored in a Markdown (md, mdx) format. At the top of any of these entry files, you will find **frontmatter**. This is space designed to hold any metadata you want to add, such as an entry's publication date, author, or whatever you want.

Adding an entry to a collection is as simple as creating a new file in the appropriate directory under `/src/content/`. For example, to add a new blog post on Bumble Bees, you would create a new file `/src/content/blog/bumble-bees.md`, and add all the necessary frontmatter. Then you can start plugging away in markdown. This is all very easy, and it's one of the best features of Astro. You can focus on writing content rather than worrying about the underlying code.

Things get a little more complicated when you want to create a new collection (or update an existing one). Here's a brief overview of how to do that. For examples, look at one of the dozen ways each of these steps are already implemented in this template.

1. The frontmatter we discussed must be defined in `/src/content/config.ts`. This file contains the schema for each collection.
2. To follow best Typescript practices, you should add your new collection type in `/src/content/config.ts`.
3. Add a new directory under `/src/content/` for your collection.
4. Lay out the structure of your entry's page. This will may consist of an `EntryLayout.astro` and a `CollectionLayout.astro` in the `/src/components/[collection]/` directory. These components will define how each entry and the collection as a whole will be displayed.
5. Connect the new collection to the routing structure by adding a new page in `/src/pages/` that will handle the routing for your collection. This typically involves calling `getEntries()` or `getIndex()` from the collection's config in the page's script section to retrieve the entries that will be referenced on that page.

For more context on how the content collections work, see the [/docs/project-structure.md](/docs/project-structure.md) page.

## Theme Colors

By default, the pallet of this site is defined in just 7 color parameters (14 if you count their dark theme variants).

| Name                 | CSS Label   | Main Use                                        |
| -------------------- | ----------- | ----------------------------------------------- |
| Text Primary         | `txt-p`     | header text                                     |
| Text Secondary       | `txt-s`     | body text                                       |
| Text Light           | `txt-light` | indicate selected text                          |
| Background Primary   | `bg-p`      | main background (unless background is an image) |
| Background Secondary | `bg-s`      | glass elements                                  |
| Background Tertiary  | `bg-t`      | glass elements intended to contrast with `bg-s` |
| Border               | `border`    | border around glass elements                    |

### Relevant Areas

`/tailwind.config.js`:

```js
module.exports = {
  ...
  theme: {
    ...
    extend: {
      colors: {
```

Structural changes would be made among:

- `/tailwind.config.js`
- `/src/styles/*`
- The inline tailwind classes in `/src/components/*`

## Fonts

External Resources:

- [Google Fonts](https://fonts.google.com/)
- [Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)
- [Inter Font](https://rsms.me/inter/#)
- [Manrope Font](https://www.gent.media/manrope)

Generic font families that require no import:

```txt
font-family: serif;
font-family: sans-serif;
font-family: monospace;
font-family: cursive;
font-family: fantasy;
font-family: system-ui; // uses the operating system's default
```

### Relevant Areas

`/tailwind.config.js`:

```js
module.exports = {
  ...
  theme: {
    ...
    extend: {
      fontSize: {
        ...
      },
      fontFamily: {
        ...
      },
```

#### `/src/styles/fonts.css`

All unused fonts referneces should be removed from this file. Likewise, any new fonts should be added here. This acts as the link between the `theme.json` and the actual font file stored in `/public/fonts/`.

#### `/public/fonts/`

Put font files here. It is recommended to store here only the font files that are actually used in the site. The more font files there are, the slower the site will load. This template comes with a few moderate options to experiment with, but you should remove any that you don't end up using.

A common alternative to this is to use a CDN to host the font files. This will work a little differently than shown here. Do not use a Google CDN, those dirty bastards can track your users that way.

## Background

By default the background is a flat color defined by the `bg-p` color parameter discussed in the **Theme Colors** section.

### Relevant Areas

#### `/src/base/Background.astro`

Here I've provided three alternate kinds of background. All are commented out, but simply uncomment the desired one to use it. These are largely for demonstration purposes, and you should feel free to delete them and replace them with your own background.

This file is referenced only in `/src/base/BaseLayout.astro`.

#### `tailwind.config.js`

The provided **Twinkling Star Background** and **Gradient Cycle Background** depend on animations defined in this file.

```js
module.exports = {
  theme: {
    extend: {
      animation: {
        // Star Background
        twinkle: "twinkle 5s infinite ease-in-out",
        // Cycle Background
        cycleBg: "cycleBg 15s ease infinite"
      },
      keyframes: {
        // Star Background
        twinkle: {
          "0%, 20%, 100%": { opacity: 1 },
          "10%": { opacity: 0.25 },
        },
        // Cycle Background
        cycleBg: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    }
  }
```

Additionally, there are code examples for single and dual-image backgrounds, depending on whether you want the background to change when the light/dark theme does. Swapping in your own images here is very straightforward.

### Parsimony

If you decide to use a solid color background, you can of course delete the code mentioned in the **Relevant Areas** section above.

## Glass Effect

One of the most powerful customization features of this template is the glass effect. By default, the template uses a true frosted glass effect, but by changing a few parameters specified below, the UI components can be given fully transparent or fully opaque backgrounds, for a more conventional website look.

| Name                      | CSS Label            | Main Use                                                |
| ------------------------- | -------------------- | ------------------------------------------------------- |
| Glass                     | `glass`              | styles the background of most components                |
| Glass Tertiary            | `glass-t`            | for glass atop other glass, resembles the use of `bg-t` |
| Glass Tertiary Borderless | `glass-t-borderless` | ui componnents with their own border                    |

Parameters:

| Name    | Explanation                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Color   | The underlying background color of the element.                                                                                        |
| Opacity | `0` is fully transparent and `1` is fully opaque. If a color is specified, the default opacity is `1`, and if not, it's transparent.   |
| Blur    | The [blur](https://tailwindcss.com/docs/blur) is applied to the element's background, and the element itself is made semi-transparent. |
| Border  | The border around the element. By default this effect is subtle, but adds a nice touch to the glass effect.                            |
| Shadow  | The shadow around the element, giving it a bit of depth.                                                                               |

### Relevant Areas

#### `/src/styles/glass.css`

## Animations

The animations are fairly subtle by default.

### Usage

| Animation  | CSS                                          |
| ---------- | -------------------------------------------- |
| Fade       | `intersect:animate-fade opacity-0`           |
| Fade Up    | `intersect:animate-fadeUp opacity-0`         |
| Fade Down  | `intersect:animate-fadeDown opacity-0`       |
| Fade Right | `intersect:animate-fadeRight opacity-0`      |
| Fade Left  | `intersect:animate-fadeLeft opacity-0`       |
| Scale      | `intersect:animate-scale opacity-0 scale-50` |

| Animation Trigger             | CSS                  |
| ----------------------------- | -------------------- |
| Element fully in view         | `intersect-full`     |
| Element 50% in view           | `intersect-half`     |
| Element 25% in view (default) | `intersect-quarter`  |
| Animate on every intersection | `intersect-repeat`   |
| Animate element immediately   | `intersect-no-queue` |

### Relevant Areas

`/tailwind.config.js`:

```js
module.exports = {
  theme: {
    extend: {
      animation: {
        // ...
      },
      keyframes: {
        // ...
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
  ],
};
```

`/src/components/base/ObserverScript.astro`:

This is a segment of JS run as an inline `<script>` in the `Base` layout component. That is, it's Javascript code that's loaded on every page of the site. It functions as a custom CSS processor for the made-up class `intersect`. The simple idea of `intersect` is to trigger an animation whatever it's applied to, only when it enter's the browser's viewport (section of the screen that's visible). In the template, you can see this in action each time you load a page, with the various components fading into view, and, as you scroll further down a page, additional components become visible.

This functionality has some problems:

1. It's not quite like ordinary CSS. It cannot be extracted to the global classes in `/src/styles/`.
2. In its current form, it presents accessability issues. There is an accessability feature supported by browsers called `prefers-reduced-motion`. To be more friendly, these unnecessary animations should be disabled when this prefernece is detected.
3. By default, many of the animations include a "fade-in", bringing the opacity of an item from 0% (invisible) to 100% (fully opaque). This is a bit finnicky when crossing the already semi-opaque "Glass" objects. When not handled properly, the result is a discrete snap from 0% opacity to 100% opacity, which doesn't look good. In all cases thus far this issue has been circumnavigable, but keep this in minds for your own customizations: when editing an "intersect" item, making it behave right on an opaque background might make it behave poorly on a semi-opaque background, or vice-versa.

I think these animations make a big difference in the feel of the site, but they add a fair bit of weight to the pages and complexity to the customization. If you don't think they're worth the hassle, they're pretty easy to remove:

1. Ctrl-Shift-F for `intersect:animate` in the project and delete that and any CSS classes to the right of that on the given line. (Make sure you don't delete any unrelated classe you've added).
2. Delete the `<ObserverScript />` reference and import in `/src/components/base/BaseLayout.astro`
3. Delete `/src/components/base/ObserverScript.astro`
4. Delete the `theme.extent.animation` and `theme.extend.keyframes` sections from the `module.exports` section of `/tailwind.config.js`.

## Related Entries

The "Related Entries" section is a feature that automatically populates a list of links to other entries in the same collection. This is not a dedicated component, but just a small section of code that can be added to any entry layout.

By default in this template, there only example of this is in blog entries: `/src/components/blog/EntryLayout.astro`. You'll notice an array of entries called `relatedEntries` is is precomputed for each entry, and passed into the EntryLayout from the calling file: `/src/pages/blog/[entry].astro`. Here you'll see the `relatedEntries` array is populated by the function in `/src/lib/similarItems.ts`, where the logic actually sits.

The way `similarItems.ts` calculates what items are similar is just by reference to whatever metadata elements you choose to include in the comparison. In this template, that includes just the Categories and Tags. So if you want to add this Related Entries section to a content collection with other taxonomies, such as Diet for a recipe collection, you would want to update the `similarItems.ts` file to account for that.

## Favicon

The favicon for the site is stored in `/public/favicon/`. For best quality across a range of devices, you should supply the many versions, as you can see there in this template. [favicon.io](https://favicon.io/) is a great resource for generating favicons.

Note: if you change the favicon, you will likely need to clear your browser's cache to see the new one.

## Tool Tips

A tooltip is a small text box that appears when a user hovers over an element. Tooltips can provide additional information about an element without cluttering the UI. Astrogon implements [Astro Tooltips](https://github.com/JulianCataldo/web-garden/tree/develop/app/Tooltips). Read it's documentation if you want to get fancy with it, but the main thing is extremely straightforward. Just add the `title` attribute to any HTML element you want to have a tooltip. For example:

```html
<button
  class="btn btn-primary"
  title="This is a tooltip!"
>
  Click Me!
</button>
```

Some customization levers are exposed in `/src/components/base/BaseLayout.astro` where `<Tooltips>` is called. Here you can specify the length of hover time before the tooltip appears, and how quickly it disappears after unhovering.

## Search

To make a collection searchable on the search page, you will need to:

1. Ensure the collection extends the `searchable` property in `/src/content/config.ts`. All that does is require the collection entries to have a title and description, otherwise there will be nothing to display in the search results.
2. Add the component to the union types comprising `SearchableEntry` in `/src/types/index.d.ts`. It's nice to keep Typescript happy.
3. Add the collection name to the `searchableCollections` array in `/src/pages/search.astro`. This tells the search algorithm which collections to actually query.

There's a built in `autodescription` feature. How this works is if an entry does not have a `description` in the frontmatter, it will automatically generate one from the first howevermany characters of the entry's body content.

The max length of the description is set in `/src/components/search/Search.tsx`. Change it if the default is upsetting to you.

## Pagination

Pagination refers to the process of dividing a large set of entries into smaller chunks or "pages". By default you can see this at work with the blog entries, where the `/blog` page will show a limited number of entries per page, and provide links to subsequent pages. This feature is fancier than it might seem, which is to say, adding it to a collection is not as easy as it seems like it should be.

Because each page of entries is, well, a page, you'll need to include a file `/src/pages/[collection]/page/[slug].astro`. This file will handle the routing for the pagination, and should look very similar to `/src/pages/[collection]/index.astro`. Of course, both will call that collection's `CollectionLayout` component. The pagination logic is handled by the `getIndex()` function in `/src/lib/pagination.ts`, which will return a slice of entries for the current page, as well as the total number of pages.

You can customize the number of entries per page by changing the `entriesPerPage` variable in both the `index.astro` and `[slug].astro` files mentioned above. Note also that the `getStaticPaths` function in `[slug].astro` operates in a special way with Astro, and build errors can occur if you define a variable outside of the function, for example.

I'm sick of writing about this without saying helpful things, so the TLDR is: just mimic how a working collection does it.

## Header and Footer

For the most part, these components will be customized within the component code directly. That is, `/src/components/base/Header.astro` and `/src/components/base/Footer.astro`.

To add or remove paths from the header, you can edit the `menu` array in `Header.astro`.

To add or remove social icons from the footer, you can edit values passed into the `<Social />` component in `Footer.astro`.
