import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "figma",
      fileName: (format) => `figma.${format}.js`,
    },
  },
  plugins: [],
});
