import test from "node:test";
import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

test("Arcade card has a real app icon and useful description", async () => {
  const html = await readFile("flashback-labs.html", "utf8");
  assert.match(html, /Pictures\/flashback-arcade-icon\.png/);
  assert.match(html, /Scan local game files, organize your collection/);
  assert.doesNotMatch(html, /flashback-logo-preview\.png/);
  const png = await readFile("Pictures/flashback-arcade-icon.png");
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.ok(png.length > 1000);
  for (const [, path] of html.matchAll(/<img[^>]*src="\.\/(.*?)"/g)) await access(path);
});

test("latest simulator entry points to present, subpath-safe assets", async () => {
  const html = await readFile("particle-lab/index.html", "utf8");
  const paths = [...html.matchAll(/(?:src|href)="\/particle-lab\/(assets\/[^"?]+)"/g)];
  assert.equal(paths.length, 2);
  for (const [, path] of paths) {
    const content = await readFile(`particle-lab/${path}`, "utf8");
    if (path.endsWith(".js")) {
      assert.ok(content.includes("/particle-lab/sw.js"));
      assert.ok(content.includes("green shows high pressure"));
      assert.doesNotMatch(content, /register\(["'`]\/sw\.js/);
    }
  }
});

test("offline installation and built pages retain their correct scope", async () => {
  const manifest = JSON.parse(await readFile("particle-lab/manifest.webmanifest", "utf8"));
  assert.equal(manifest.scope, "/particle-lab/");
  assert.equal(manifest.start_url, "/particle-lab/");
  assert.ok(manifest.icons.every(icon => icon.src.startsWith("/particle-lab/")));
  const worker = await readFile("particle-lab/sw.js", "utf8");
  assert.match(worker, /v58-gravity-flow/);
  assert.match(worker, /key\.startsWith\("particle-simulator-"\)/);
  assert.doesNotMatch(worker, /cache\.put\("\/"/);
  await access("dist/particle-lab/index.html");
  await access("dist/Pictures/flashback-arcade-icon.png");
});
