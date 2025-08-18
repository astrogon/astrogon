# Tech Stack

This is a template for a static, content-driven website. Currently supported content collection types include a blog, recipe book, and documentation set. Using these as a guide you can create your own as well. While the architecture could be made to support dynamic content like user login, or a storefront, this template has made no steps in that direction.

## Justifying the Tech Stack

1. We want a static site.
    1. There's no need for dynamic components.
    2. Static sites are easier to build and maintain.
    3. Static sites are easier to deploy and host.
    4. Static sites are more secure and less breakable.
2. There are a handful of popular frameworks oriented around static site generation, e.g. Gatsby, Hugo, Jekyll. Most predate Astro, and I'm pretty sure all are worse. I refuse to elaborate.
3. Host Choice
    1. A few places host your site for free, but many won't. Given that we're going to be static and low-traffic (no offense), we're prime candidates for free hosting.
    2. Host choice in this framework isn't the biggest committment, and should not be that hard to change later if you want.
    3. **GitHub Pages** and **Cloudflare Pages** are good options these days.
    4. GitHub Pages Advantages
       1. It is easy, you're already using Github.
       2. Github is not a dominant tech giant in web-hosting.
    5. Cloudflare Pages Advantages
       1. offers more, and is also pretty easy to set up.
       2. Letss you manage your domain and host a site on the same platform.
       3. Let you host like 100 projects for free (Github lets you host 1).
       4. As a dominant force in the space, they have a lot of fancy tooling and infrastructure that supposedly result in faster page load and higher security than Github can (or has any reason to) offer.
       5. If you get to a point where you want to extend Astro beyond a fully static state, Cloudflare can support that, Github can't.
4. Isolating the development environment (optional)
   1. If you have a special interest in isolating the software used to build your website locally, consider [Devbox](https://www.jetify.com/docs/devbox/).
   2. This would alter your workflow and the setup steps as described in this documentation, so ignore this if you're unsure what this means.
   3. Mimic [this PR](https://github.com/astrogon/astrogon/pull/30/commits/0f85e0c21e71a2fb00210f4588ed51d6398da163) from @fkromer for Devbox setup.

## TODO

1. Find and purchase a domain name from [Cloudflare](https://domains.cloudflare.com/) or someone.
   - Don't do this until you're committed to your site of course.
   - If you're planning to use GitHub Pages to host, you don't need your own domain, but it'd probably be better if you had one anyway.
2. Get a [GitHub](https://github.com/) account.
3. Download and install [VS Code](https://code.visualstudio.com/download).
4. Download and install [Git](https://git-scm.com/download/win).
5. Follow [this guide](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows) to install NVM and Node/NPM on Windows.
6. Acquire your own copy of the template repository.
   - If you fork this repo, you could continue to pull updates to the `template` branch as they're made.
   - If you don't want to deal with that, and want to completely cut Git ties to `reednel/pages`, this is acceptable.
7. Follow the repo's README to get the app up and running locally.
8. Follow Astro's guide for deploying a site to [GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) or [Cloudflare Pages](https://docs.astro.build/en/guides/deploy/cloudflare/).
9. If using Github Pages, follow [this guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site?platform=windows) to get your domain name swapped in.

## But Why?

1. Git, Github
    1. Git is a version control system, the most popular and I'd say best. Git tracks changes to files. It's kind of opaque but it's simple enough once you spend some time with it. GitHub is a platform over Git that makes it easier to look at and interact with, and stores things in clouds, and a bunch of other valuable things. Another thing is that GitHub Actions + GitHub Pages will make it so whatever we push up to GitHub is automatically built and deployed on your site.
2. Astro
    1. If we weren't using a web framework such as Astro, we'd be committed to plain HTML/CSS/JS, with which it is much more difficult to make nice things. The benefit to simplicity is you won't have dependency issues basically ever. But the occasional maintainence is worth it.
3. Node, NVM, NPM
    1. Node is Hell, don't forget it. The source of my hatred for web development. But it's necessary. With Astro (and most other frameworks) it's inescapable.
    2. Node is Node, but NPM is the Node Package Manager. What Node actually does is...basically be a vast library of web tools (packages). But these things are small and numerous and conflict in unpredictable ways and depend on each other and specific versions in particular. This trememdous mess is what NPM handles. Albeit not very well sometimes.
    3. It is likely that eventually you will need another version of Node. The Node Version Manager (NVM) makes the installation of and swapping between Node versions easy.
4. VS Code
    1. VS Code is a lightweight but powerful code editor. Easily the best thing Microsoft ever made.
