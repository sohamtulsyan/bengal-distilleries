import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE_PATH lets the same build serve from a GitHub Pages project URL
// (e.g. BASE_PATH=/bengal-distilleries/) or from the domain root on Vercel.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
});
