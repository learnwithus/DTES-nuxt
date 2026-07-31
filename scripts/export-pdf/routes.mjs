import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

// Routes that should never appear in the exported document.
const EXCLUDED = new Set(["/unsupported-browser"]);

/**
 * Walk the generated site and collect every route that produced an index.html.
 *
 * Using the build output rather than re-deriving routes from pages/ means the
 * dynamic /tour/_region/_video routes come along for free, and new videos added
 * under content/tour/*\/videos/ are picked up without touching this file.
 */
export async function discoverRoutes(distDir) {
  const routes = [];

  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.name === "index.html") {
        const rel = relative(distDir, dir).split(sep).join("/");
        routes.push(rel === "" ? "/" : `/${rel}`);
      }
    }
  }

  await walk(distDir);
  return routes.filter((route) => !EXCLUDED.has(route));
}

/**
 * Alphabetical order interleaves the document badly — /tour/coastal/* would sort
 * ahead of /tour/conclusion, and the two regions would be split by /tour/videos.
 * Order routes the way a reader moves through the site instead.
 */
export function orderRoutes(routes) {
  const remaining = new Set(routes);
  const ordered = [];

  const take = (route) => {
    if (remaining.delete(route)) ordered.push(route);
  };

  // A video contributes two routes: the profile page, then the player page.
  const takeRegion = (region) => {
    take(`/tour/${region}`);
    const prefix = `/tour/${region}/`;
    const slugs = [...remaining]
      .filter((r) => r.startsWith(prefix) && !r.endsWith("/watch"))
      .sort();
    for (const slug of slugs) {
      take(slug);
      take(`${slug}/watch`);
    }
  };

  take("/");
  take("/about");
  take("/learn");
  take("/tour");
  take("/tour/intro");
  take("/tour/intro/watch");
  takeRegion("dtes");
  takeRegion("coastal");
  take("/tour/videos");
  take("/tour/conclusion");
  take("/resources");

  // Anything added to the site later still lands in the document.
  ordered.push(...[...remaining].sort());
  return ordered;
}
