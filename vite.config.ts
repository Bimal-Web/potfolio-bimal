import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@react-three/rapier") || id.includes("@dimforge/rapier3d-compat")) {
              return "vendor-physics";
            }
            if (id.includes("@react-three/postprocessing") || id.includes("postprocessing")) {
              return "vendor-postprocessing";
            }
            if (id.includes("@react-three/drei") || id.includes("@react-three/fiber")) {
              return "vendor-r3f";
            }
            if (id.includes("three")) {
              return "vendor-three";
            }
            if (id.includes("gsap")) {
              return "vendor-gsap";
            }
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
          }
        },
      },
    },
  },
});
