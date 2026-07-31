import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";

import { discoverRoutes, orderRoutes } from "./routes.mjs";
import { walkLearn } from "./learn.mjs";
import { preparePage, renderPdf, VIEWPORT } from "./render.mjs";
import { serveStatic } from "./server.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const DIST_DIR = join(PROJECT_ROOT, "dist");
const OUTPUT = join(PROJECT_ROOT, "resisting-stigma.pdf");
const PORT = 4173;

async function main() {
  const routes = orderRoutes(await discoverRoutes(DIST_DIR));
  if (routes.length === 0) {
    throw new Error(
      `No routes found in ${DIST_DIR}. Run \`npm run generate\` first.`
    );
  }
  console.log(`Found ${routes.length} routes`);

  const server = await serveStatic(DIST_DIR, PORT);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  // Capture the site as it appears on screen rather than letting any print
  // rules reflow it.
  await page.emulateMedia({ media: "screen" });

  const sections = [];

  try {
    for (const route of routes) {
      const url = `http://localhost:${PORT}${route === "/" ? "/" : route}`;

      if (route === "/learn") {
        sections.push(...(await captureLearn(page, url)));
        continue;
      }

      await preparePage(page, url);
      sections.push({ label: route, bytes: await renderPdf(page) });
      console.log(`  ${route}`);
    }
  } finally {
    await browser.close();
    server.close();
  }

  await writeFile(OUTPUT, await mergePdfs(sections));
  console.log(`\nWrote ${OUTPUT} (${sections.length} sections)`);
}

/** Expand the single /learn route into one capture per module screen. */
async function captureLearn(page, url) {
  await preparePage(page, url);
  const captured = [];

  await walkLearn(page, async (label) => {
    captured.push({ label, bytes: await renderPdf(page) });
    console.log(`  /learn → ${label}`);
  });

  return captured;
}

async function mergePdfs(sections) {
  const merged = await PDFDocument.create();

  for (const section of sections) {
    const doc = await PDFDocument.load(section.bytes);
    const pages = await merged.copyPages(doc, doc.getPageIndices());
    for (const page of pages) merged.addPage(page);
  }

  merged.setTitle("Resisting Stigma");
  merged.setCreator("scripts/export-pdf");
  return merged.save();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
