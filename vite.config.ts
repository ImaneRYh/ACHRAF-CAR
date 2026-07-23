import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client/src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: "client",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  // Si vous déployez sur https://<username>.github.io/<repo>/, 
  // décommentez la ligne suivante et remplacez <repo> par le nom de votre dépôt :
  base: "/ACHRAF-CAR/",
});
