import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { extname } from "https://deno.land/std@0.224.0/path/mod.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // 1. Serve homepage at "/"
  if (pathname === "/") {
    const res = await fetch(import.meta.resolve("./pages/home/home.html"));
    return new Response(await res.arrayBuffer(), {
      headers: { "Content-Type": "text/html" },
    });
  }

  // 2. Serve assets for homepage
  if (
    pathname.startsWith("/assets") ||
    pathname.startsWith("/script") ||
    pathname.startsWith("/style")
  ) {
    const filePath = `./pages/home${pathname}`;
    try {
      const res = await fetch(import.meta.resolve(filePath));
      return new Response(await res.arrayBuffer(), {
        headers: { "Content-Type": getContentType(filePath) },
      });
    } catch (_) {
      return new Response("Asset not found", { status: 404 });
    }
  }

  // 3. Serve /index.css from root
  if (pathname === "/index.css") {
    try {
      const res = await fetch(import.meta.resolve("./index.css"));
      return new Response(await res.arrayBuffer(), {
        headers: { "Content-Type": "text/css" },
      });
    } catch {
      return new Response("index.css not found", { status: 404 });
    }
  }

  // 4. Serve React app from "/start"
  if (pathname.startsWith("/start")) {
    const reactPath = pathname.replace("/start", "") || "/";
    const newReq = new Request("http://localhost" + reactPath, req);
    const res = await serveDir(newReq, {
      fsRoot: "./dist",
      showDirListing: false,
      enableCors: true,
    });

    // If the file is not found (404), fall back to index.html (React Router support)
    if (res.status === 404) {
      const fallback = await fetch(import.meta.resolve("./dist/index.html"));
      return new Response(await fallback.arrayBuffer(), {
        headers: { "Content-Type": "text/html" },
      });
    }

    return res;
  }

  // 5. Fallback
  return new Response("Not Found", { status: 404 });
});

// Helper to detect content type
function getContentType(path: string): string {
  const ext = extname(path);
  switch (ext) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "application/javascript";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".svg":
      return "image/svg+xml";
    case ".mp3":
      return "audio/mpeg";
    default:
      return "application/octet-stream";
  }
}
