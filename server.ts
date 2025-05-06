import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";
import { extname } from "https://deno.land/std@0.224.0/path/mod.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const pathname = url.pathname;

  // 1. Serve home page at "/"
  if (pathname === "/") {
    const file = await Deno.readFile("pages/home/home.html");
    return new Response(file, {
      headers: { "Content-Type": "text/html" },
    });
  }

  // 2. Serve assets and CSS under "/assets" and "/home.css"
  if (pathname.startsWith("/assets") || pathname === "/home.css") {
    const filePath = `pages/home${pathname}`;
    try {
      const file = await Deno.readFile(filePath);
      const contentType = getContentType(filePath);
      return new Response(file, {
        headers: { "Content-Type": contentType },
      });
    } catch (_) {
      return new Response("Asset not found", { status: 404 });
    }
  }

  // 3. Serve React app from "/game"
  if (pathname.startsWith("/start")) {
    console.log("START");
    const newReq = new Request(req.url.replace("/start", ""), req);
    return serveDir(newReq, {
      fsRoot: "./dist",
      urlRoot: "",
      showDirListing: false,
      enableCors: true,
    });
  }

  // Serve /index.css from root
  if (pathname === "/index.css") {
    try {
      const file = await Deno.readFile("index.css");
      return new Response(file, {
        headers: { "Content-Type": "text/css" },
      });
    } catch {
      return new Response("index.css not found", { status: 404 });
    }
  }
  // 4. Fallback 404
  return new Response("Not Found", { status: 404 });
});

// Helper to detect content type based on file extension
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
