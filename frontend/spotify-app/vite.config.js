import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3001",
    },
  },
  server: {
    host: "127.0.0.1", // Or '0.0.0.0' to listen on all addresses
  },
});
