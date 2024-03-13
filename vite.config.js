import { loadEnv } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            TMAP_API_KEY: env.VITE_KEY_MAP,
          },
        },
      }),
    ],
    build: {
      outDir: "build",
    },
  };
};
