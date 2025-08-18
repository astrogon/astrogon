# Writer infos

Notes

1. These docs are intended to be friendly and understandable for beginners, so anyone can rapidly assume ownership of this code.
2. Don't confuse these docs with the **Content Collection** called docs.

Recommended reading order:

1. [Tech Stack](./tech-stack.md) - Explains the choice of technologies used for this application, their limitations, and all the setup needed to get the site deployed to the internet.
2. [Project Structure](./project-structure.md) - Provides an overview of the project directory.
3. [Customization](./customization.md) - Points out the areas of highest impact for customization, and examples of this template's range.

## Git Quick Reference

### The Main Loop

Once you've made all the changes you want...

- Stage your changed files for commit: `git add .`
- Commit them, with a descriptive message: `git commit -m "message here"`
- Push the changes up to GitHub: `git push origin main`

### Other Useful Commands

If there's a change to any of your Node packages: `npm install`
If you mess things up real bad and just want to revert to the last commit: `git reset --hard`
When you want to pull changes down from GitHub: `git pull origin main`

### 🧞 Commands (by Astro)

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


## See Also

[Astro Documentation](https://docs.astro.build) - The official documentation for Astro. If there's an Astro topic you're confused about, you can probably find a consise and clear explanation here.