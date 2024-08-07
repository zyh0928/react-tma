import { resolve } from "path";

import Yaml from "@rollup/plugin-yaml";
import React from "@vitejs/plugin-react-swc";
import AutoImport from "unplugin-auto-import/vite";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig, loadEnv } from "vite";
import Svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, __dirname, "BASE_URL").BASE_URL,
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "[ext]/[name].[hash].[ext]",
        chunkFileNames: "js/[name].[hash].js",
        entryFileNames: "js/[name].[hash].js",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          } else if (id.includes("src/assets/icons")) {
            return "icons";
          }
        },
      },
    },
  },
  envPrefix: "TMA_",
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : void 0,
  },
  plugins: [
    Unfonts({
      google: {
        families: [
          {
            name: "Raleway",
            styles: "wght@300;400;500;700",
          },
          {
            name: "Noto Sans SC",
            styles: "wght@300;400;500;700",
          },
        ],
      },
    }),
    Yaml(),
    Svgr(),
    React(),
    AutoImport({
      dts: "@types/auto-imports.d.ts",
      eslintrc: {
        enabled: !0,
        globalsPropValue: "readonly",
      },
      imports: [
        "react",
        "react-router-dom",
        "react-i18next",
        {
          "react-use": ["useToggle", "useUpdateEffect", "useEffectOnce"],
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "#": resolve(__dirname, "src/context"),
      $: resolve(__dirname, "src/service"),
      "%": resolve(__dirname, "src/pages"),
      "@": resolve(__dirname, "src"),
      "@@": resolve(__dirname, "."),
      "~": resolve(__dirname, "src/assets"),
    },
  },
  server: {
    host: !0,
    port: 9029,
    strictPort: !0,
  },
}));
