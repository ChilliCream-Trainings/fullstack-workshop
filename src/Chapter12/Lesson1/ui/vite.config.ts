import react from "@vitejs/plugin-react";

import relay from "vite-plugin-relay";
import { URL, fileURLToPath } from "node:url";
import { defineProject } from "vitest/config";

/**
 * Vite configuration.
 * https://vitejs.dev/config/
 */
export default defineProject(async ({ mode }) => {
  return {
    cacheDir: fileURLToPath(new URL("./.cache/vite-app", import.meta.url)),

    root: "./app",
    resolve: {
      alias: {
        "@": fileURLToPath(new URL(".", import.meta.url)),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
    },

    plugins: [react(), relay],

    server: {
      port: process.env.PORT || 5173,
      proxy: {
        "/graphql": {
          target: "http://localhost:5220/graphql",
          changeOrigin: true,
        },
      },
    },

    test: {
      ...{ cache: { dir: "./.cache/vitest" } },
      environment: "happy-dom",
    },
  };
});
