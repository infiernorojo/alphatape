import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    // Local dev convenience: make /api/pm/* work without needing Vercel Functions.
    proxy: {
      "/api/pm/trades": {
        target: "https://data-api.polymarket.com",
        changeOrigin: true,
        rewrite: (p) => p.replace("/api/pm", ""),
      },
      "/api/pm/positions": {
        target: "https://data-api.polymarket.com",
        changeOrigin: true,
        rewrite: (p) => p.replace("/api/pm", ""),
      },
      "/api/pm/markets": {
        target: "https://gamma-api.polymarket.com",
        changeOrigin: true,
        rewrite: (p) => p.replace("/api/pm", ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
