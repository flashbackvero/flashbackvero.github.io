// Stage an already verified simulator build without removing older cached assets.
import { readFile, writeFile, copyFile, mkdir, readdir, access } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

if (!process.argv[2]) throw new Error("Pass the simulator's static-build/dist directory.");
const source = resolve(process.argv[2]);
const target = fileURLToPath(new URL("../particle-lab/", import.meta.url));
for (const path of ["index.html", "manifest.webmanifest", "sw.js", "assets"]) await access(join(source, path));
await mkdir(join(target, "assets"), { recursive: true });
for (const name of await readdir(join(source, "assets"))) {
  if (name.endsWith(".js")) {
    let script = await readFile(join(source, "assets", name), "utf8");
    script = script.replace(/(["'`])\/(sw\.js|manifest\.webmanifest)\1/g, (_, quote, path) => `${quote}/particle-lab/${path}${quote}`);
    script = script.replace(/urls:\[(["'`])\/\1/g, 'urls:["/particle-lab/"');
    if (!script.includes('/particle-lab/sw.js')) throw new Error("Service worker path was not rebased.");
    await writeFile(join(target, "assets", name), script);
  } else await copyFile(join(source, "assets", name), join(target, "assets", name));
}
await writeFile(join(target, "index.html"), (await readFile(join(source, "index.html"), "utf8")).replace(/\r\n?/g, "\n"));
const manifest = JSON.parse(await readFile(join(source, "manifest.webmanifest"), "utf8"));
manifest.id = manifest.start_url = manifest.scope = "/particle-lab/";
for (const icon of manifest.icons) icon.src = `/particle-lab/${icon.src.replace(/^\//, "")}`;
await writeFile(join(target, "manifest.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");
let worker = await readFile(join(source, "sw.js"), "utf8");
worker = worker.replace(/const CACHE = .*?;/, 'const CACHE = "particle-simulator-v58-gravity-flow";');
worker = worker.replace(/"\/(.*?)"/g, (_, path) => `"/particle-lab/${path}"`);
worker = worker.replace('key !== CACHE', 'key.startsWith("particle-simulator-") && key !== CACHE');
await writeFile(join(target, "sw.js"), worker);
for (const name of ["apple-touch-icon.png", "icon-64.png", "icon-192.png", "icon-512.png", "favicon.svg", "particle-lab.ico", "og-v19.png"]) {
  await copyFile(join(source, name), join(target, name));
}
console.log("Staged latest simulator with scoped install/offline paths.");
