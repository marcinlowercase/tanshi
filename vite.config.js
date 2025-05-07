import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/start/",
  plugins: [react()],
  build: {
    outDir: "dist", // this must match what `server.ts` is serving
  },
});
