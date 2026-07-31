import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".vtt": "text/vtt; charset=utf-8",
  ".m3u8": "application/vnd.apple.mpegurl",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

async function resolveFile(root, urlPath) {
  // normalize() collapses any ../ before it can escape the dist directory.
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const candidate = join(root, safe);
  if (!candidate.startsWith(root)) return null;

  try {
    const info = await stat(candidate);
    if (info.isDirectory()) {
      const index = join(candidate, "index.html");
      await stat(index);
      return index;
    }
    return candidate;
  } catch {
    return null;
  }
}

/** Serve the generated site the same way it is deployed: as plain static files. */
export function serveStatic(root, port) {
  const server = createServer(async (req, res) => {
    const urlPath = new URL(req.url, "http://localhost").pathname;
    const file = await resolveFile(root, urlPath);

    if (!file) {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "content-type": MIME[extname(file).toLowerCase()] || "application/octet-stream",
      "cache-control": "no-store",
    });
    createReadStream(file).pipe(res);
  });

  return new Promise((resolve, reject) => {
    server.on("error", reject);
    server.listen(port, () => resolve(server));
  });
}
