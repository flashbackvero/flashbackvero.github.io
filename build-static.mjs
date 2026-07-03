import { copyFile, cp, mkdir, readdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { extname, join } from "node:path";

const distDir = "dist";
const supportFiles = ["page.css", "page-background.js"];
const assetExtensions = new Set([
  ".aac",
  ".flac",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".m4a",
  ".mov",
  ".mp3",
  ".mp4",
  ".ogg",
  ".png",
  ".svg",
  ".wav",
  ".webp",
]);

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

const entries = await readdir(".");
const pages = entries.filter((entry) => extname(entry).toLowerCase() === ".html");
const mediaAssets = entries.filter((entry) => assetExtensions.has(extname(entry).toLowerCase()));

for (const file of [...pages, ...supportFiles, ...mediaAssets]) {
  await copyFile(file, join(distDir, file));
}

if (existsSync("Pictures")) {
  await cp("Pictures", join(distDir, "Pictures"), { recursive: true });
}

if (existsSync("booth pics")) {
  await cp("booth pics", join(distDir, "booth pics"), { recursive: true });
}

console.log(`Built ${pages.length} pages into ${distDir}`);
