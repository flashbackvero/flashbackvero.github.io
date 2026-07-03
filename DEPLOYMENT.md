# Vero Flashback Deployment

This site is ready for Cloudflare Pages.

## Cloudflare Pages Settings

- Framework preset: None
- Production branch: main
- Build command: npm run build
- Build output directory: dist
- Root directory: /
- Node version: 22

## First Live Deploy

1. Push this folder to the GitHub repository for the site.
2. In Cloudflare, go to Workers & Pages.
3. Create a Pages project and choose Connect to Git.
4. Select the GitHub repository.
5. Use the settings above, then Save and Deploy.
6. After the first deploy finishes, add the purchased domain under the Pages project's Custom domains settings.

## Future Updates

Make edits locally, run:

```bash
npm run build
```

Then commit and push to GitHub. Cloudflare Pages will rebuild and publish the newest version automatically.
